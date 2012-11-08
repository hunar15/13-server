var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb',
  multipleStatements : true
});

exports.getBatch =  function(args, callback) {
	//query
	//var outlet_id = args.outlet_id;
	var query = 'SELECT * FROM batch_request;';
	
	if(outlet_id !== null) {
		var result = {};
		result['metadata'] = [];
		result['data']= [];

		result['metadata'].push({"name": "outlet_id", "label" : "Shop Name", "datatype" : "string"});
		result['metadata'].push({"name": "date", "label" : "Date of Request", "datatype" : "date"});
		result['metadata'].push({"name": "status", "label" : "Status", "datatype" : "string"});
		result['metadata'].push({"name": "approve", "label": "Forward"});

		connection.query( query,  function(err, rows, fields) {
			for( var i in rows) {
				var current = {};
				current['id'] = i;
				current['values'] = rows[i];
				result['data'].push(current);
			}
			callback(err, rows);
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
		var query = "INSERT INTO batch_request VALUES("+outlet_id+",CURDATE(),\'PENDING\');",
			errorFlag= 0,
			query2 = '';
		connection.query(query, function(err, rows, fields){
			if(!err) {
				console.log("Adding request "+ addedList[0]['request_id'] +" from " + outlet_id);
				for(var i in addedList) {
					var current = addedList[i];
					query2 +=  "INSERT INTO request_details VALUES("+outlet_id+",CURDATE(),"+current['barcode']+","+current['quantity']+",\'false\');";
					
				}
				connection.query(query2, function(err, rows, fields) {
						if(err) {
							//errorFlag = 1;
							console("Error encountered : " + err);
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
	} else {
		callback("Invalid or absent parameters");
	}
};

exports.approveBatchRequest = function(args, callback) {
	
};

var s_errorFlag = 0;
function callSyncReceivedRequestsQuery(query,current,outlet_id,i,len,callback) {
	connection.query(query, function(err, rows2, fields) {
		if(err) {
			s_errorFlag =1 ;
			console.log("Error encountered : "+err);
		} else {
			console.log("Request ID : " +current['request_id']+" status UPDATED");
		}
		if( i == (len - 1)) {
			if(s_errorFlag) {
				callback(err, {status : "ERROR"});
			} else {
				callback(err, {status : "COMPLETED"});
			}
		}
	});
}
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
		for(var i in receivedList) {
			var current = receivedList[i];
			var query = "UPDATE request SET status=\'COMPLETED\' WHERE outlet_id="+outlet_id+" AND request_id=" + current['request_id']+";";
			callSyncReceivedRequestsQuery(query,current,outlet_id,i,receivedList.length,callback);
		}
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
	var query = 'UPDATE req_details SET quantity='+quantity+
				' WHERE request_id='+request_id+' AND barcode='+barcode+' AND outlet_id='+outlet_id+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};


