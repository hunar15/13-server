var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb'
});

exports.getProducts =  function(args, callback) {
	//query
	connection.connect();
	var query = 'select s_name, barcode, name, manufacturer, stock, min_stock' + 
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
		connection.end();
		callback(err, rows);
	});
};

exports.addProduct = function (args, callback) {
	// body...
	connection.connect();
	var name = args.name,
		category = args.category,
		barcode = args.barcode,
		cost_price = args.cost_price,
		manufacturer = args.manufacturer;
	var query = 'INSERT INTO product VALUES('+name+','+category+','+barcode+','+cost_price+','+manufacturer+');';
	connection.query( query, function (err, rows, fields) {
		// body...
		connection.end();
		callback(err, rows);
	});
};

exports.deleteProduct = function (args, callback) {
	// body...
	connection.connect();
	var barcode = args.barcode;
	var query = 'DELETE FROM product WHERE barcode='+barcode+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		connection.end();
		callback(err, rows);
	});
};
exports.updateProduct = function (args, callback) {
	// body...
	connection.connect();
	var name = args.name,
		category = args.category,
		barcode = args.barcode,
		cost_price = args.cost_price,
		manufacturer = args.manufacturer;
	var query = 'UPDATE product SET name=\''+name+'\', category =\''+category+'\', cost_price='+cost_price+
				', manufacturer=\''+manufacturer+'\' WHERE barcode='+barcode+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		connection.end();
		callback(err, rows);
	});
};