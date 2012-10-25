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
exports.getInventory =  function(args, callback) {
	//query
	var query = 'SELECT s_name, barcode, name, manufacturer, stock, min_stock' + 
			', selling_price, cost_price FROM ' + 
			' product INNER JOIN inventory on barcode = product_barcode' + 
			' INNER JOIN outlet ON id = outlet_id ';
	var searchParameter = args.query;

	if(searchParameter != 'none') {
		query += ' WHERE s_name LIKE \'%' + searchParameter + '%\' OR name LIKE \'%' + searchParameter + '%\' ';
	}
	var pageNumber = args.pageNumber,
		sortBy = args.sortby,
		resultsPerPage = args.itemperpage,
		order = (args.asc === true) ? 'ASC' : 'DESC';

	query += 'LIMIT ' + pageNumber*resultsPerPage + ', ' + resultsPerPage +
			' ORDER BY ' + sortBy + ' ' + order + ';';
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
	var query = 'INSERT INTO inventory VALUES('+outlet_id+','+product_barcode+','+stock+','+selling_price+','+min_stock+');';
	connection.query( query, function (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};

exports.deleteFromInventory = function (args, callback) {
	// body...
	var outlet_id = args.outlet_id,
		product_barcode = args.product_barcode;
	var query = 'DELETE FROM inventory where outlet_id='+id+' AND product_barcode='+product_barcode+';';
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


