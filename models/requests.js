var config = require('../config/config'),
	async = require('async'),
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
		result['metadata'].push({"name":"received","label":"Received"});
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

exports.pushNewRequests = function(args, callback) {
	var outlet_id = args.data.outletid,
		addedList = args.list;

	if(outlet_id !== null &&  addedList !== null) {
		/*var query = "INSERT INTO batch_request VALUES("+outlet_id+",CURDATE(),\'PENDING\');",
			errorFlag= 0,
			query2 = '';*/
		var detail_query='',
			batch_query = 'INSERT INTO batch_request SELECT '+outlet_id+',CURDATE(),\'PENDING\' FROM DUAL WHERE ' +
				'NOT EXISTS(SELECT * FROM batch_request WHERE date=CURDATE() AND outlet_id='+outlet_id+');',
			i=0;

		if(addedList.length === 0) {
			console.log("No new requests to sync");
			callback(null,{STATUS : "SUCCESS"});
		} else {
			connection.query(batch_query, function(err, rows, fields){
				if(!err) {
					console.log("Adding request details from " + outlet_id);
					async.forEachSeries(addedList,function (current,async_callback) {
				// body...
						i++;
						detail_query += "INSERT INTO request_details SELECT "+outlet_id+",CURDATE(),"+
									current['barcode']+","+current['quantity']+",0 FROM DUAL WHERE NOT EXISTS"+
									"( SELECT * from request_details WHERE date=CURDATE() AND outlet_id="+outlet_id+
									" AND barcode="+current['barcode']+" );";

						if((i%config.segment_size)===0 || i ==(addedList.length)) {
							connection.query(detail_query, function (err2, rows2, fields2) {
								if(!err2) {
									console.log('POST : ' + i);
									detail_query='';
									async_callback(null);
								} else {
									console.log(err2);
									async_callback(true);
								}
							});
						} else {
							async_callback(null);
						}
					},
					function(err){
							// if any of the saves produced an error, err would equal that error
							if(err)
								callback(err,true);
							else
								callback(null,{STATUS : "SUCCESS"});
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
				callback(err, {'STATUS' : "ERROR"});
			} else {
				console.log("RECEIVED requests of Outlet ID: " + outlet_id + " synced");
				callback(err, {'STATUS' : "COMPLETED"});
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
				callback(err, {'STATUS' : "ERROR"});
			} else {
				console.log("RECEIVED requests of Outlet ID: " + outlet_id + " synced");
				callback(err, {'STATUS' : "COMPLETED"});
			}
		});
	} else {
		console.log("Invalid or absent parameters");
		callback(err,{status : "ERROR"});
	}

};

exports.pullDispatchedRequests = function (args, callback) {
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