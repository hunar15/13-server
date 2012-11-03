var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb'
});

exports.getAllInventory = function  (callback) {
	// body...
	var query = 'select * FROM inventory;';
	connection.query(query, function  (err, rows, fields) {
		// body...
		callback(err, rows);
	});
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
		console.log("DOES THIS SHOW!???");
		console.log(rows);
		if(!err) {
			result['discontinueList'] = rows;
			var query2 = "UPDATE inventory SET status=\'DISCONTINUED\' WHERE outlet_id="+outlet_id+" AND status=\'DISCONTINUE\'";
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
exports.getInventory =  function(args, callback) {
	//query
	var query = 'SELECT s_name, barcode, name, manufacturer, stock, min_stock' +
			', selling_price, cost_price FROM ' +
			' product INNER JOIN inventory on barcode = product_barcode' +
			' INNER JOIN outlet ON id = outlet_id AND status NOT LIKE \'%DISCONTINUE%\';';
	/*var searchParameter = args.query;

	/*if(searchParameter != 'none') {
		query += ' WHERE s_name LIKE \'%' + searchParameter + '%\' OR name LIKE \'%' + searchParameter + '%\' ';
	}
	var pageNumber = args.pageNumber,
		sortBy = args.sortby,
		resultsPerPage = args.itemperpage,
		order = (args.asc === true) ? 'ASC' : 'DESC';

	query += 'LIMIT ' + pageNumber*resultsPerPage + ', ' + resultsPerPage +
			' ORDER BY ' + sortBy + ' ' + order + ';';*/

	connection.query( query,  function(err, rows, fields) {
		callback(err, rows);
	});
};

exports.addToInventory = function (args, callback) {
	// body...
	var outlet_id = args.outlet_id,
		product_barcode = args.product_barcode,
		stock = args.stock,
		selling_price = args.selling_price,
		min_stock = args.min_stock;
	var query = 'INSERT INTO inventory VALUES('+outlet_id+','+product_barcode+','+stock+','+selling_price+','+min_stock+',\'ADDED\');';
	connection.query( query, function (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};

exports.deleteFromInventory = function (args, callback) {
	// body...
	var outlet_id = args.outlet_id,
		product_barcode = args.product_barcode;
	var query = 'UPDATE inventory SET status=\'DISCONTINUE\' where outlet_id='+id+' AND product_barcode='+product_barcode+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};

exports.updateInventory = function (args, callback) {
	// body...
	var outlet_id = args.outlet_id,
		product_barcode = args.product_barcode,
		stock = args.stock,
		selling_price = args.selling_price,
		min_stock = args.min_stock;
	var query = 'UPDATE inventory SET stock='+stock+', selling_price='+selling_price+',min_stock='+min_stock+
				' WHERE outlet_id='+outlet_id+' AND product_barcode='+product_barcode+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};


