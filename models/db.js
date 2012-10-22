var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb'
});

exports.getall = function  (callback) {
	// body...
	connection.connect();

	var query = 'select * FROM product;';
	connection.query(query, function  (err, rows, fields) {
		// body...
		connection.end();
		callback(err, rows);
	});
};
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

exports.getRestockRequests = function (args, callback) {
	// body...
	connection.connect();

	var query = '';
	connection.query( query, function (err, rows, fields) {
		// body...
		connection.end();
		callback(err, rows);
	});
};