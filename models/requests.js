var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb',
  multipleStatements : true
});

exports.getBatch =  function(args, callback) {

	var query = 'SELECT * FROM batch_request;';
	
	var result = {};
	result['metadata'] = [];
	result['data']= [];

	result['metadata'].push({"name": "outlet_id", "label" : "Shop Name", "datatype" : "string"});
	result['metadata'].push({"name": "date", "label" : "Date of Request", "datatype" : "date"});
	result['metadata'].push({"name": "status", "label" : "Status", "datatype" : "string"});
	result['metadata'].push({"name": "approve", "label": "Forward"});
	result['metadata'].push({"name": "details", "label": "Details"});

	connection.query( query,  function(err, rows, fields) {
		for( var i in rows) {
			var current = {};
			current['id'] = i;
			current['values'] = rows[i];
			result['data'].push(current);
		}
		callback(err, result);
	});
	
	
};

exports.getBatchByOutlet =  function(args, callback) {
	//get requests of a SPECIFIC outlets
	var outlet_id = args.outlet_id,
		query = 'SELECT * FROM batch_request WHERE outlet_id = '+outlet_id+';';
	
	if(outlet_id !== null) {

		var result = {};
		result['metadata'] = [];
		result['data']= [];

		result['metadata'].push({"name": "outlet_id", "label" : "Shop Name", "datatype" : "string"});
		result['metadata'].push({"name": "date", "label" : "Date of Request", "datatype" : "date"});
		result['metadata'].push({"name": "status", "label" : "Status", "datatype" : "string"});
		result['metadata'].push({"name": "approve", "label": "Forward"});
		result['metadata'].push({"name": "details", "label": "Details"});

		connection.query( query,  function(err, rows, fields) {
			for( var i in rows) {
				var current = {};
				current['id'] = i;
				current['values'] = rows[i];
				result['data'].push(current);
			}
			callback(err, result);
		});
	} else {
		console.log("Invalid or missing parameters");
		callback({err : "true"}, null);
	}
	
};

exports.getBatchDetails = function (args, callback) {
	var outlet_id = args.outlet_id,
		date = args.date;

	if( outlet_id!==null && date!==null) {
		var result = {},
			query = "SELECT barcode, quantity, received FROM request_details WHERE outlet_id=" + outlet_id + " AND date=" + date + ";";
		result['metadata'] = [];
		result['data']= [];

		result['metadata'].push({"name": "barcode", "label" : "Product Barcode", "datatype" : "string"});
		result['metadata'].push({"name": "quantity", "label" : "Quantity", "datatype" : "integer"});
		result['metadata'].push({"name": "received", "label" : "Received?"});

		connection.query(query, function(err, rows, fields) {
			if(!err) {
				for (var i in rows) {
					var current = {};
					current['id'] = rows[i]['barcode'];
					current['values'] = rows[i];
					result['data'].push(current);
				}
				callback(null,result);
			} else {
				console.log("Error : " + err);
				callback(true, null);
			}
		});

	} else {
		console.log("Invalid or missing parameters");
		callback(true, null);
	}

};

exports.syncAddedRequests = function(args, callback) {
	var outlet_id = args.outletid,
		addedList = args.addedList;

	if(outlet_id !== null &&  addedList !== null) {
		/*var query = "INSERT INTO batch_request VALUES("+outlet_id+",CURDATE(),\'PENDING\');",
			errorFlag= 0,
			query2 = '';*/
		var detail_query='',
			batch_query = 'INSERT INTO batch_request SELECT '+outlet_id+',CURDATE(),\'PENDING\' FROM DUAL WHERE ' +
				'NOT EXISTS(SELECT * FROM batch_request WHERE date=CURDATE() AND outlet_id='+outlet_id+');';

		if(addedList.length === 0) {
			console.log("No new requests to sync");
			callback(null,{status : "ADDED"});
		} else {
			for(var i in addedList) {
				var current = addedList[i];
				detail_query += "INSERT INTO request_details VALUES("+outlet_id+",CURDATE(),"+current['barcode']+","+current['quantity']+",\'false\');";
			}

			connection.query(batch_query, function(err, rows, fields){
				if(!err) {
					console.log("Adding request details from " + outlet_id);
					connection.query(detail_query, function(err, rows, fields) {
							if(err) {
								//errorFlag = 1;
								console.log("Error encountered : " + err);
								callback(err,{status : "ERROR"});
							} else {
								console.log("Requests successfully added");
								callback(err, {status : "ADDED"});
							}
						});
				} else {
					console.log(err);
					callback(err);
				}
				
			});
		}
	} else {
		callback("Invalid or absent parameters");
	}
};

exports.approveBatchRequest = function(args, callback) {
	var outlet_id = args.outlet_id,
		date = args.date;

	if( outlet_id!==null && date !== null) {
		var query = "UPDATE batch_request SET status=\'FORWARDED\' WHERE outlet_id="+outlet_id+" AND date=" + date + ";";

		connection.query(query, function(err,rows, fields) {
			if(!err) {
				console.log("Batch Restock Request successfully APPROVED");
				callback(null,{ status:"APPROVED"});
			} else {
				console.log("Errors encountered : "+ err);
				callback(true, null);
			}
		});
	}
};

var s_errorFlag = 0;

exports.setAsReceived = function(args, callback) {
	var outlet_id = args.outlet_id,
		date = args.date,
		barcode = args.barcode;

	if(outlet_id!== null && date!==null && barcode!==null) {
		var query = "UPDATE request_details SET received=true WHERE outlet_id="+outlet_id+" AND date=\'"+date+"\' AND barcode="+barcode+" ;";

		connection.query(query, function(err,rows, fields) {
			if(!err) {
				console.log(query);
				console.log("Barcode : " + barcode + " RECEIVED");
				//callback(null,true);

				//check if all products in the batch have been received and update
				var query2 ="UPDATE batch_request SET status=\'INCOMPLETE\' WHERE outlet_id="+outlet_id+" AND date=\'"+date+"\' ;";

				connection.query(query2, function(err2,rows2,fields2) {
					if(!err2) {
						var query3 = "UPDATE batch_request SET status=\'DISPATCHED\' WHERE outlet_id="+outlet_id+" AND date=\'"+date+"\'"+
							" AND NOT EXISTS( SELECT * from request_details WHERE outlet_id="+outlet_id+" AND date=\'"+date+"\' AND received=\'false\')";

						connection.query(query3, function(err3, rows3, fields3) {
							if(!err3) {
								console.log("Batch Request COMPLETED");
								callback(null,true);
							} else {
								console.log("Error encountered : " + err3);
								callback(true,null);
							}
						});
					} else {
						console.log("Error encountered : "+ err2);
						callback(true,null);
					}
				});
			} else {
				console.log("Error encountered : " + err);
				callback(true,null);
			}
		});
	} else {
		console.log("Invalid or absent parameters");
		callback(true,null);
	}
};

exports.syncReceivedRequests =  function(args, callback) {
	var outlet_id = args.outletid,
		receivedList = args.receivedList,
		errorFlag = 0;
	s_errorFlag =0;
	if( outlet_id !== null && receivedList !== null ) {
		console.log("Incoming Sync Request from outlet : " + outlet_id);
		if(receivedList.length === 0) {
			console.log("Nothing to sync");
			callback(null,{status : "COMPLETED"});
		}
		var query='';
		for(var i in receivedList) {
			var current = receivedList[i];
			console.log(current['date']);
			query += "UPDATE batch_request SET status=\'COMPLETED\' WHERE outlet_id="+outlet_id+" AND date=\"" + current['date'].split("T")[0]+"\";";
		}
		//callSyncReceivedRequestsQuery(query,current,outlet_id,i,receivedList.length,callback);
		connection.query(query, function(err,rows,fields) {
			console.log(query);
			if(err) {
				console.log("Error encountered : "+err);
				callback(err, {status : "ERROR"});
			} else {
				console.log("RECEIVED requests of Outlet ID: " + outlet_id + " synced");
				callback(err, {status : "COMPLETED"});
			}
		});
	} else {
		console.log("Invalid or absent parameters");
		callback(err,{status : "ERROR"});
	}

};

exports.updateRequest = function (args, callback) {
	// body...
	var barcode = args.barcode,
		request_id = args.request_id,
		quantity = args.quantity,
		outlet_id = args.outlet_id;
	var query = 'UPDATE request_details SET quantity='+quantity+
				' WHERE request_id='+request_id+' AND barcode='+barcode+' AND outlet_id='+outlet_id+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};


