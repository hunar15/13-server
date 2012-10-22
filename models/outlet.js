var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb'
});

exports.getAllOutlets = function  (callback) {
	// body...
	connection.connect();

	var query = 'select * FROM outlet;';
	connection.query(query, function  (err, rows, fields) {
		// body...
		connection.end();
		callback(err, rows);
	});
};
exports.getOutlets =  function(args, callback) {
	//query
	connection.connect();
	var query = 'select id,s_name, address' + 
			' FROM outlet';
	var searchParameter = args.query;

	if(searchParameter != 'none') {
		query += ' WHERE s_name LIKE \'%' + searchParameter + '%\' OR address LIKE \'%' + searchParameter + '%\' ';
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

exports.addOutlet = function (args, callback) {
	// body...
	connection.connect();
	var s_name = args.s_name,
		address = args.address;
	var query = 'INSERT INTO outlet VALUES(\''+s_name+'\','+address+');';
	connection.query( query, function (err, rows, fields) {
		// body...
		connection.end();
		callback(err, rows);
	});
};

exports.deleteOutlet = function (args, callback) {
	// body...
	connection.connect();
	var id = args.id;
	var query = 'DELETE FROM outlet where id='+id+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		connection.end();
		callback(err, rows);
	});
};

exports.updateOutlet = function (args, callback) {
	// body...
	connection.connect();
	var id = args.id;
	var query = 'UPDATE outlet SET s_name=\''+s_name+'\', address=\''+address+'\' WHERE id='+id+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		connection.end();
		callback(err, rows);
	});
};


