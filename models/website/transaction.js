var config = require('../../config/config'),
	connection = config.connection,
	onlineid = config.onlineid;

exports.viewTransactions = function (args, callback) {
	var fbid = args.fbid;

	if(fbid !== null) {
		var query = 'SELECT id, address, timestamp, status FROM online_transaction '+
			' WHERE fbid=' + connection.escape(fbid) + ' ;';

		var result = {};
		result['metadata'] = [];
		result['data']= [];

		result['metadata'].push({"name": "id", "label" : "Transaction ID", "datatype" : "integer"});
		result['metadata'].push({"name": "address", "label" : "Delivery Address", "datatype" : "string"});
		result['metadata'].push({"name": "timestamp", "label" : "Time and Date", "datatype" : "string"});
		result['metadata'].push({"name": "status", "label" : "Status", "datatype" : "string"});
		
		connection.query(query, function (err, rows, fields) {
			// body...
			if(!err) {
				for ( var i in rows) {
					var current = {};		
					current['id']=rows[i]['id'];
					current['values']=rows[i];
					result['data'].push(current);
				}
				callback(null,result);
			} else {
				callback(err,true);
			}
		});
	} else {
		console.log("Invalid or absent parameers");
		callback(true,null);
	}
};

exports.viewTransactionDetaiks = function (args, callback) {
	// body..
	var id = args.id;

	if(id!==null) {
		var query = 'SELECT barcode, quantity, price from online_transaction_details '+
		' WHERE id='+id+' ;';

		var result = {};
		result['metadata'] = [];
		result['data']= [];

		result['metadata'].push({"name": "barcode", "label" : "Barcode", "datatype" : "integer"});
		result['metadata'].push({"name": "quantity", "label" : "Quantity", "datatype" : "integer"});
		result['metadata'].push({"name": "price", "label" : "Price", "datatype" : "float"});
		
		connection.query(query, function (err, rows, fields) {
			// body...
			if(!err) {
				for ( var i in rows) {
					var current = {};		
					current['id']=rows[i]['barcode'];
					current['values']=rows[i];
					result['data'].push(current);
				}
				callback(null,result);
			} else {
				callback(err,true);
			}
		});
	} else { 
		console.log("Invalid or absent parameers");
		callback(true,null);
	}
	
};

exports.dispatchTransaction = function (args, callback) {
	// body...
	var id = args.id;

	if(id!==null) {
		var query = 'UPDATE online_transaction SET status=\'DISPATCHED\' WHERE id='+id+';';

		connection.query(query, function (err, rows, fields) {
			// body...
			if(!err) {
				console.log("Online Transaction ID : " +id+ " DISPATCHED");
				callback(null,true);
			} else {
				callback(err,true);
			}
		});
	} else { 
		console.log("Invalid or absent parameers");
		callback(true,null);
	}
};

exports.setAsReceived = function (args, callback) {
	// body...
	var id = args.id;

	if(id!==null) {
		var query = 'UPDATE online_transaction SET status=\'RECEIVED\' WHERE id='+id+';';

		connection.query(query, function (err, rows, fields) {
			// body...
			if(!err) {
				console.log("Online Transaction ID : " +id+ " RECEIVED by the owner");
				callback(null,true);
			} else {
				callback(err,true);
			}
		});
	} else { 
		console.log("Invalid or absent parameers");
		callback(true,null);
	}
};
exports.processTransaction = function (args ,callback) {
	// body...
	var fbid = args.fbid,
		address = args.address,
		list = args.list;

	if(fbid!==null && address!==null && list!==null) {
		if(list.length !== 0) {
			//validate a transaction first 
			var valid_query = '';
			var query2 = 'INSERT INTO online_transaction(address,fbid) VALUES('+connection.escape(address)+','+connection.escape(fbid)+');';
			for( var i in list) {
				var current= list[i];

				valid_query += 'SELECT stock-'+current.quantity+' as stock FROM inventory WHERE ' +
					' outlet_id='+onlineid+' and product_barcode='+current.barcode+' ;';
			}

			connection.query(valid_query, function (err, rows, fields) {
				// body...
				if(!err) {
					var error = 0;
					for(var i in list) {
						var current = list[i];
						if(rows[i].stock < 0)
							error = 1;

						query2 += 'INSERT INTO online_transaction_details VALUES('+rows.insertId+','+current.barcode+
									','+current.quantity+','+current.price+');';
						//modify query in next line
						query2 += 'UPDATE inventory set stock= VALUES('+rows.insertId+','+current.barcode+
									','+current.quantity+','+current.price+');';
					}
					if(error !== 0) {
						console.log("Invalid transaction quantity");
						callback({"STATUS" : "INVALID"},null);
					} else {
						connection.query(query, function (err2, rows2, fields3) {
							// body...
							if(!err) {
								connection.query(query, function (err2, rows, fields) {
									// body...
									if(!err2) {
										console.log("Transaction with ID : " +rows.insertId + " added" );
										callback(null,true);
									} else {
										callback(err2,true);
									}
								});

								
							} else {
								callback(err,true);
							}
						});
					}	
				} else {
					callback(err,true);
				}
			});

		} else {
			console.log("Nothing to process");
			callback(true,null);
		}
		
	} else { 
		console.log("Invalid or absent parameers");
		callback(true,null);
	}
};