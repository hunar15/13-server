var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb'
});

exports.getAllRequests = function  (callback) {
	// body...

	var query = 'select * FROM request;';
	connection.query(query, function  (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};
exports.getRequests =  function(args, callback) {
	//query
	var query = 'SELECT request_id, s_name, date FROM outlet INNER JOIN request on id = outlet_id';
	/*var searchParameter = args.query;

	if(searchParameter != 'none') {
		query += ' WHERE s_name LIKE \'%' + searchParameter + '%\' ';
	}*/
	query += ';';
	/*var pageNumber = args.pageNumber,
		sortBy = args.sortby,
		resultsPerPage = args.itemperpage,
		order = (args.asc === true) ? 'ASC' : 'DESC';

	query += 'LIMIT ' + pageNumber*resultsPerPage + ', ' + resultsPerPage +
			' ORDER BY ' + sortBy + ' ' + order + ';';*/
	connection.query( query,  function(err, rows, fields) {
		callback(err, rows);
	});
};

exports.addRequest = function (args, callback) {
	// body...
	var outlet_id = args.outlet_id,
		date = args.date,
		req_details = args.req_details;
	var query = 'INSERT INTO request VALUES('+outlet_id+','+date+');';
	connection.query( query, function (err, rows, fields) {
		// body...
		var req_id = rows.insertId;
		for (var current in req_details) {
			var barcode = current.barcode,
				quantity = current.barcode;

			var sub_query = 'INSERT INTO req_details VALUES('+req_id+','+barcode+','+quantity+');';
			connection.query( sub_query);
		}
		callback(err, rows);
	});
};

exports.deleteRequest = function (args, callback) {
	// body...
	var request_id = args.request_id;
	var query = 'DELETE FROM req_details where request_id='+request_id+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		query = 'DELETE FROM request where request_id='+request_id+';';
		connection.query( query, function (err, rows, fields) {
			// body...
			callback(err, rows);
		});
	});
};

exports.syncAddedRequests = function(args, callback) {
	var outlet_id = args.outletid,
		addedList = args.addedList;

	if(outlet_id !== null &&  addedList !== null) {
		var query = "INSERT INTO request VALUES("+addedList[0]['request_id']+", "+outlet_id+",NOW(),\'ADDED\');",
			errorFlag= 0;
		connection.query(query, function(err, rows, fields){
			if(!err) {
				console.log("Adding request "+ addedList[0]['request_id'] +" from " + outlet_id);
				for(var i in addedList) {
					var current = addedList[i],
						query2 =  "INSERT INTO req_details VALUES("+current['request_id']+","+outlet_id+","+current['barcode']+","+current['quantity']+");";
					connection.query(query2, function(err, rows, fields) {
						if(err) {
							errorFlag = 1;
							console("Error encountered : " + err);
							callback(err);
						} else {
							console.log(current['barcode'] + " request successfully added");
						}
						if(i== (addedList.length -1) ) {
							if(errorFlag) {
								callback(err, {status : "ERROR"});
							} else {
								callback(err, {status : "ADDED"});
							}
						}
					});
				}
			} else {
				console.log(err);
				callback(err);
			}
			
		});
	} else {
		callback("Invalid or absent parameters");
	}
};

exports.syncReceivedRequests =  function(args, callback) {
	var outlet_id = args.outletid,
		receivedList = args.receivedList,
		errorFlag = 0;

	if( outlet_id !== null && receivedList !== null ) {
		for(var i in receivedList) {
			var current = receivedList[i];
			var query = "UDPATE request SET status=\'COMPLETED\' WHERE outlet_id="+outlet_id+"AND request_id=" + current['request_id']+";";
			connection.query(query, function(err, rows2, fields) {
				if(err) {
					errorFlag =1 ;
					console.log("Error encountered : "+err);
				} else {
					console.log("Request ID : " +current['request_id']+" status UPDATED");
				}
				if( i == (receivedList.length - 1)) {
					if(errorFlag) {
						callback(err, {status : "ERROR"});
					} else {
						callback(err, {status : "COMPLETED"});
					}
				}
			});
		}
	} else {
		console.log("Invalid or absent parameters");
	}
};

exports.updateRequest = function (args, callback) {
	// body...
	var barcode = args.barcode,
		request_id = args.request_id,
		quantity = args.quantity;
	var query = 'UPDATE req_details SET quantity='+quantity+
				' WHERE request_id='+request_id+' AND barcode='+barcode+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};


