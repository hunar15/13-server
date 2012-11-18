var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb',
  multipleStatements : true
});

exports.getAllInventory = function  (callback) {
	// body...
	var query = 'SELECT s_name,outlet_id, barcode, name,category, manufacturer, stock, min_stock' +
			', selling_price, cost_price, status FROM ' +
			' product INNER JOIN inventory on barcode = product_barcode' +
			' INNER JOIN outlet ON id = outlet_id ;';

	var result = {};
	result['metadata'] = [];
	result['data']= [];

	result['metadata'].push({"name": "outlet_id", "label" : "Outlet ID", "datatype" : "integer"});
	result['metadata'].push({"name": "s_name", "label" : "Shop Name", "datatype" : "string"});
	result['metadata'].push({"name": "barcode", "label" : "Barcode", "datatype" : "string"});
	result['metadata'].push({"name": "name", "label" : "Name", "datatype" : "string"});
	result['metadata'].push({"name": "category", "label" : "Category", "datatype" : "string"});
	result['metadata'].push({"name": "manufacturer", "label" : "Manufacturer", "datatype" : "string"});
	result['metadata'].push({"name": "stock", "label" : "Stock", "datatype" : "string"});
	result['metadata'].push({"name": "min_stock", "label" : "Min. Stock", "datatype" : "integer"});
	result['metadata'].push({"name": "selling_price", "label" : "Selling Price", "datatype" : "double(2)"});
	result['metadata'].push({"name": "cost_price", "label" : "Cost Price", "datatype" : "double(2)"});
	result['metadata'].push({"name": "status", "label" : "Status", "datatype" : "string"});
	result['metadata'].push({"name": "discontinue", "label": "Discontinue"});
	connection.query(query, function  (err, rows, fields) {
		// body...
		for( var i in rows) {
			var current = {};
			current['id'] = i;
			current['values'] = rows[i];
			result['data'].push(current);
		}
		callback(err, result);
	});
};

exports.getNotSelling = function(args, callback) {
	var barcode = args.barcode;

	if(barcode!== null) {
		var query = 'SELECT distinct id, s_name from outlet WHERE NOT EXISTS( SELECT * FROM inventory WHERE product_barcode='+barcode+' and outlet_id = id);';
		connection.query(query, function(err, rows, fields) {
			if(!err) {
				console.log(rows);
				console.log("Query successfully executed");
				callback(null,rows);
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

exports.getAdded = function (args, callback) {
	// body...
	var outlet_id = args.outletid,
		query = 'SELECT barcode, name, category, manufacturer, stock, min_stock' +
			', selling_price, cost_price FROM ' +
			' product INNER JOIN inventory on barcode = product_barcode' +
			' INNER JOIN outlet ON id = outlet_id WHERE status=\'ADDED\' AND outlet_id='+outlet_id+';';
	var result = {};
	connection.query( query, function (err, rows, fields) {
		// body...
		result['addedList'] = rows;
		if(!err) {
			var query2 = "UPDATE inventory SET status=\'NORMAL\' WHERE outlet_id="+outlet_id+" AND status=\'ADDED\'";
			connection.query(query2, function (err2, rows2, fields2) {
				if(!err2)
					callback(err2, result);
				else
					console.log(err2);
			});
		} else {
			console.log(err);
		}
	});
};

exports.getDiscontinued = function (args, callback) {
	// body...
	var outlet_id = args.outletid,
		query = 'SELECT barcode FROM ' +
			' product INNER JOIN inventory on barcode = product_barcode' +
			' INNER JOIN outlet ON id = outlet_id WHERE status=\'DISCONTINUE\' AND outlet_id='+outlet_id+';';
	var result={};
	connection.query( query, function (err, rows, fields) {
		// body...

		if(!err) {
			result['discontinueList'] = rows;
			var query2 = "UPDATE inventory SET status=\'DISCONTINUED\' WHERE outlet_id="+outlet_id+" AND status=\'DISCONTINUE\'";
			connection.query(query2, function (err2, rows2, fields2) {
				if(!err2) {
					callback(err2, result);
				}
				else
					console.log(err2);
			});
		} else {
			console.log(err);
		}
	});
};
exports.getInventory =  function(args, callback) {
	//query
	var query = 'SELECT s_name, outlet_id, barcode, name,category, manufacturer, stock, min_stock' +
			', selling_price, cost_price, status FROM ' +
			' product INNER JOIN inventory on barcode = product_barcode' +
			' INNER JOIN outlet ON id = outlet_id AND status NOT LIKE \'%DISCONTINUE%\';';
					
	var result = {};
	result['metadata'] = [];
	result['data']= [];
	
	result['metadata'].push({"name": "outlet_id", "label" : "Outlet ID", "datatype" : "integer"});
	result['metadata'].push({"name": "s_name", "label" : "Shop Name", "datatype" : "string"});
	result['metadata'].push({"name": "barcode", "label" : "Barcode", "datatype" : "string"});
	result['metadata'].push({"name": "name", "label" : "Name", "datatype" : "string"});
	result['metadata'].push({"name": "category", "label" : "Category", "datatype" : "string"});
	result['metadata'].push({"name": "manufacturer", "label" : "Manufacturer", "datatype" : "string"});
	result['metadata'].push({"name": "stock", "label" : "Stock", "datatype" : "integer"});
	result['metadata'].push({"name": "min_stock", "label" : "Min. Stock", "datatype" : "integer( , 0, dot, comma, 0, n/a)", "editable": true});
	result['metadata'].push({"name": "selling_price", "label" : "Selling Price", "datatype" : "double($, 2, dot, , 0, n/a)", "editable": true});
	result['metadata'].push({"name": "cost_price", "label" : "Cost Price", "datatype" : "double(2)"});
	result['metadata'].push({"name": "status", "label" : "Status", "datatype" : "string"});
	result['metadata'].push({"name": "discontinue", "label": "Discontinue"});
	
	connection.query( query,  function(err, rows, fields) {
		for( var i in rows) {
			var current = {};
			current['id'] = rows[i]['barcode'];
			current['values'] = rows[i];
			result['data'].push(current);
		}
		callback(err, result);
	});
};

exports.addToInventory = function (args, callback) {
	// body...
	/*
	{
		product_barcode : "",
	}
	*/
	var outlet_ids = args.outlet_ids,
		product_barcode = args.product_barcode,
		selling_price = args.selling_price,
		min_stock = args.min_stock,
		query = '';
	for( var i  in outlet_ids) {
		var current = outlet_ids[i];
		query += 'INSERT INTO inventory VALUES('+current+','+product_barcode+',0,'+selling_price+','+min_stock+',\'ADDED\');';
		
	}
console.log(query);
	connection.query( query, function (err, rows, fields) {
		// body...
		if(!err) {
			console.log("No error encountered");
			callback(null, true);
		} else {
			console.log("Error encountered while ADDING to inventory");
			callback(true, null);
		}
	});
};


exports.deleteFromInventory = function (args, callback) {
	// body...
	var outlet_id = args.outlet_id,
		product_barcode = args.product_barcode;
	var query = 'UPDATE inventory SET status=\'DISCONTINUE\' where outlet_id='+outlet_id+' AND product_barcode='+product_barcode+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};

exports.updateInventory = function (args, callback) {
	// body...
	var outlet_id = args.outlet_id,
		product_barcode = args.product_barcode,
		min_stock = args.min_stock,
		selling_price = args.selling_price;
		
	var query = 'UPDATE inventory SET min_stock='+min_stock+
				' , selling_price='+selling_price+', status=\'UPDATED\' WHERE outlet_id='+outlet_id+' AND product_barcode='+product_barcode+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		if(!err) {
			callback(null,true);
		} else {
			console.log("ERROR encountered : " + err);
			callback(true,null);
		}
	});
};

exports.syncUpdated = function (args, callback) {
	var outlet_id = args.outletid,
		result = {};
		
	//result['ms_list'] = [];
	if(outlet_id !== null) {
		var query = 'SELECT product_barcode as barcode, min_stock FROM inventory where status=\'UPDATED\' AND outlet_id='+outlet_id+ ' ;';

		connection.query(query, function(err, rows, fields) {
			if(!err) {
				result['ms_list'] = rows;

				query = 'UPDATE inventory SET status=\'NORMAL\' WHERE outlet_id=' + outlet_id + ' AND status=\'UPDATED\';';

				connection.query( query, function( err2, rows2, fields2) {
					if(!err2) {
						callback(null,result);
					} else {
						console.log("ERROR encountered : " + err2);
						callback(true,null);
					}
				});
			} else {
				console.log("ERROR encountered : " + err);
				callback(true,null);
			}
		});
	} else {
		console.log("Invalid or absent parameters");
		callback(true,null);
	}
};


