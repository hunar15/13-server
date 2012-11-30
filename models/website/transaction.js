var config = require('../../config/config'),
	connection = config.connection,
	onlineid = config.onlineid,
	transaction = require('../transaction');

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
				console.log(result);
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

exports.viewTransactionDetails = function (args, callback) {
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
				console.log(result);
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
function computeAndSyncRestockRequests(callback) {
	var select_query = 'SELECT product_barcode as barcode, 2*min_stock as quantity from  inventory '+
			' WHERE outlet_id='+onlineid+' and stock < min_stock and status <> \'DISCONTINUED\' and not exists('+
			' select * from request_details r where r.barcode=product_barcode and r.date=CURDATE());';

	connection.query(select_query, function (err, rows, fields) {
		// body...
		if(!err) {
			if(rows.length !== 0) {
				console.log("This should'nt appear for the second time");
				var batch_query = 'insert into batch_request select '+onlineid+', CURDATE(), \'PENDING\' FROM DUAL '+
						' WHERE NOT EXISTS( select * from batch_request where outlet_id='+onlineid+' and date=CURDATE());';

				for(var i in rows) {
					var current = rows[i];

					batch_query += 'insert into request_details values('+onlineid+',CURDATE(),'+current.barcode+
							', ' +current.quantity+', 0); ';
				}
				connection.query(batch_query,function(err2,rows2,fields2) {
					// body...
					if(!err2) {
						console.log("Online RESTOCK requests successfully added");
						callback(null,{"STATUS":"SUCCESS"});
					} else {
						console.log("Error occured during batch_query : "+ err2);
						callback(err2,true);
					}
				});
			} else {
				console.log("No restock requests to be ADDED");
				callback(null,true);
			}
		} else {
			console.log("Error occured during select_query : "+ err);
			callback(err,true);
		}
	});
}
exports.processTransaction = function (args ,callback) {
	// body...
	var fbid = args.fbid,
		address = args.address,
		list = args.list;

	console.log("Arguments : "+fbid+"," + address + ","+ list);
	if( fbid !== undefined &&  address!== undefined &&  list!== undefined) {
		if(list.length !== 0) {
			//validate a transaction first
			var valid_query = '';
			var create_query = 'INSERT INTO online_transaction(address,fbid) VALUES('+connection.escape(address)+','+connection.escape(fbid)+');';
			console.log(create_query);
			for( var i in list) {
				var current= list[i];

				valid_query += 'SELECT stock-'+current.quantity+' as quantity FROM inventory WHERE ' +
					' outlet_id='+onlineid+' and product_barcode='+current.barcode+' ;';
			}
			console.log(valid_query);
			connection.query(valid_query, function (err, rows, fields) {
				// body...
				if(!err) {
					var error = 0;
					for(var i in list) {
						var current = list[i];
						if(rows[i][0].quantity < 0)
							error = 1;
					}
					if(error === 0) {
						connection.query(create_query, function (err4, rows4, fields4) {
						// body...
							if(!err4) {
								var query2 ='';
								for(var i in list) {
									var current = list[i];
									list[i].id = rows4.insertId;
									if(rows[i][0].quantity < 0)
										error = 1;
									console.log(" Quantity of barcode : "+current.barcode+" after transaction = " + rows[i][0].quantity);
									query2 += 'INSERT INTO online_transaction_details VALUES('+rows4.insertId+','+current.barcode+
												','+current.quantity+','+current.price+');';
									//modify query in next line
									query2 += 'UPDATE inventory SET stock=stock-'+current.quantity+' WHERE outlet_id='+onlineid+
												' AND product_barcode='+current.barcode+' ;';
								}
								
								//Append query which makes restock requests for products which add
								//restock requests
								connection.query(query2, function (err2, rows2, fields3) {
									// body...
									/*
									
									TRANSACTION SHOULD ALSO CONSEQUENTLY PUSH STOCK REQUESTS AFTER
									RESTOCK CHECK

									MAKE RELEVANT CHANGES AFTER THIS STEP
									*/
									if(!err2) {
										var para = {};
										para.outletid = onlineid;
										para.transaction = list;
										console.log(para);
										transaction.syncTransactions(para, function (err3, result3) {
											// body...
											if(!err3) {
												console.log("Transaction with ID : " +rows4.insertId + " processed and added" );
												console.log("Computing Restock Requests...");
												computeAndSyncRestockRequests(callback);
											} else {
												console.log("Error : "+err3);
												callback(err3,true);
											}
										});
									} else {
										callback(err,true);
									}
								});
							} else {
								callback(err,true);
							}
						});
					} else {
						console.log("Invalid transaction quantity");
						callback({"STATUS" : "INVALID"},null);
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
		console.log("Invalid or absent parameters");
		callback(true,null);
	}
};