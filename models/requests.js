var config = require('../config/config'),
	connection = config.connection;

exports.getBatch =  function(args, callback) {

	var query = 'SELECT outlet_id, outlet.s_name, date, status FROM batch_request, outlet WHERE batch_request.outlet_id = outlet.id;';
	
	var result = {};
	result['metadata'] = [];
	result['data']= [];

	result['metadata'].push({"name": "outlet_id", "label" : "Outlet ID", "datatype" : "integer"});
	result['metadata'].push({"name": "s_name", "label" : "Outlet Name", "datatype" : "string"});
	result['metadata'].push({"name": "date", "label" : "Date of Request", "datatype" : "date"});
	result['metadata'].push({"name": "status", "label" : "Status", "datatype" : "string"});
	result['metadata'].push({"name": "approve", "label": "Forward"});
	result['metadata'].push({"name": "details", "label": "Details"});

	connection.query( query,  function(err, rows, fields) {
		for( var i in rows) {
			var current = {};
			rows[i].date = rows[i].date.toJSON().substring(0,10);
			current['id'] = i;
			current['values'] = rows[i];
			result['data'].push(current);
		}
		callback(err, result);
	});
	
	
};
exports.setAsReceived = function (args, callback) {
	// body...
	var outlet_id = args.outlet_id,
		date = args.date,
		barcode = args.barcode,
		quantity = args.quantity;

	if(outlet_id !== undefined && date !== undefined && barcode !== undefined && outlet_id == config.onlineid) {
		var query = 'UPDATE request_details set received=1 where outlet_id='+outlet_id+' AND '+
			'date='+connection.escape(date)+' and barcode='+barcode+';';

		query += ' UPDATE inventory set stock=stock+'+quantity+' where outlet_id='+outlet_id+' AND product_barcode='+barcode+' ;';
		query += ' UPDATE batch_request set status=\'INCOMPLETE\' where outlet_id='+outlet_id+' AND date='+connection.escape(date)+' ;';
		query += ' UPDATE batch_request set status=\'COMPLETED\' WHERE outlet_id='+outlet_id+' AND date='+connection.escape(date)+
				' AND NOT EXISTS( select * from request_details r where r.outlet_id='+outlet_id+' AND r.date='+connection.escape(date)+' AND received=0);';

		connection.query(query, function (err,rows,fields) {
			// body...
			if(!err) {
				console.log("Successfully set as RECEIVED");
				callback(null,true);
			} else {
				console.log("ERROR : " + err);
				callback(true,null);
			}
		});
		 
	} else {
		console.log("Invalid or missing parameters");
		callback({err : "true"}, null);
	}
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
	console.log(outlet_id);
	console.log(date);
	if( outlet_id!==null && date!==null) {
		var result = {},
			query = "SELECT barcode, quantity FROM request_details WHERE outlet_id=" + outlet_id + " AND date='" + date + "';";
		result['metadata'] = [];
		result['data']= [];

		result['metadata'].push({"name": "barcode", "label" : "Product Barcode", "datatype" : "string"});
		result['metadata'].push({"name": "quantity", "label" : "Quantity", "datatype" : "string"});
		if(outlet_id == config.onlineid) {
			result['metadata'].push({"name":"received","label":"Received"});
		}
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
				detail_query += "INSERT INTO request_details SELECT "+outlet_id+",CURDATE(),"+
							current['barcode']+","+current['quantity']+",0 FROM DUAL WHERE NOT EXISTS"+
							"( SELECT * from request_details WHERE date=CURDATE() AND outlet_id="+outlet_id+
							" AND barcode="+current['barcode']+" );";
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
	console.log(outlet_id);
	console.log(date);
	if( outlet_id!==null && date !== null) {
		var query = "UPDATE batch_request SET status=\'DISPATCHED\' WHERE outlet_id="+outlet_id+" AND date='" + date + "';";
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



exports.outletReceived =  function(args, callback) {
	var outlet_id = args.outletid,
		barcode = args.barcode,
		date = args.date;

	if( outlet_id !== undefined && barcode !== undefined && date !== undefined) {
		//console.log("Incoming Sync Request from outlet : " + outlet_id);
		
		var query='';
		query += "UPDATE request_details SET received=1 WHERE outlet_id="+outlet_id+" AND date="+connection.escape(date)+" AND barcode="+barcode+";";
		query += "UPDATE batch_request SET status=\'INCOMPLETE\' WHERE date="+connection.escape(date)+" ;";
		query += "UPDATE batch_request SET status=\'COMPLETED\' WHERE date="+connection.escape(date)+" AND outlet_id="+outlet_id+
				" AND NOT EXISTS( SELECT * from request_details WHERE date="+connection.escape(date)+" AND outlet_id="+outlet_id+" AND received=0);";
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

exports.outletReceivedAll =  function(args, callback) {
	var outlet_id = args.outletid,
		date = args.date;

	if( outlet_id !== undefined && date !== undefined) {
		//console.log("Incoming Sync Request from outlet : " + outlet_id);
		
		var query='';
		query += "UPDATE request_details SET received=1 WHERE outlet_id="+outlet_id+" AND date="+connection.escape(date)+" ;";
		query += "UPDATE batch_request SET status=\'COMPLETED\' WHERE date="+connection.escape(date)+" AND outlet_id="+outlet_id+" ;";
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

exports.syncIncompleteRequests = function (args, callback) {
	var outlet_id = args.outletid,
		incompleteList = args.incompleteList;

	if(outlet_id !== null && incompleteList !== null) {
		var query = '',
			query2 = '';
		
		if(incompleteList.length !== 0) {

			for(var i in incompleteList) {
				var current = incompleteList[i];
				query += 'UPDATE batch_request set status=\'INCOMPLETE\' WHERE outlet_id='+outlet_id+' AND date=\''+current['date']+'\';';
				query += 'UPDATE request_details set received=\''+current['received']+'\' WHERE outlet_id='+outlet_id+' AND barcode='+current['barcode']+' AND date=\''+current['date']+'\';';
			}
			connection.query(query, function( err, rows, fields ) {
				console.log(err);
				if(!err) {
					console.log("INCOMPLETE Requests from Outlet ID : " + outlet_id + " synced");
					callback(null,{status : "COMPLETED"});
				} else {
					console.log("ERROR : " + err);
					callback(true,null);
				}
			});
		} else {
			console.log("No INCOMPLETE requests to be synced");
			callback(null,{status : "COMPLETED"});
		}
	} else {
		console.log("Invalid or absent parameters");
		callback(true,null);
	}
};
exports.syncDispatchedRequests = function (args, callback) {
	var outlet_id = args.outletid;

	if(outlet_id !== null) {
		var query = 'SELECT date from batch_request WHERE outlet_id=' + outlet_id + ' AND status=\'DISPATCHED\';';
		var result = {};
		result['dp_list'] = [];
		result['STATUS'] = "SUCCESS";
		connection.query(query, function( err, rows, fields ) {
			console.log(err);
			if(!err) {
				result['dp_list'] = rows;
				callback(null,result);
			} else {
				console.log("ERROR : " + err);
				callback(true,null);
			}
		});
	} else {
		console.log("Invalid or absent parameters");
		callback(true,null);
	}
};