var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb'
});

exports.getAllOutlets = function  (callback) {
	// body...

	var query = 'select * FROM outlet;';
	connection.query(query, function  (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};
exports.getOutlets =  function(args, callback) {
	//query
	var query = 'select id,s_name, address FROM outlet';
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
		callback(err, rows);
	});
};

exports.addOutlet = function (args, callback) {
	// body...
	console.log(args);
	var s_name = args.s_name,
		address = args.address;
	var query = 'INSERT INTO outlet(s_name,address) VALUES(\''+s_name+'\',\''+address+'\');';
	console.log(query);
	connection.query( query, function (err, rows, fields) {
		// body...
		console.log(err);
		console.log(rows);
		console.log(fields);
		callback(err, rows);
	});
};

exports.deleteOutlet = function (args, callback) {
	// body...
	var id = args.id;
	var query = 'DELETE FROM outlet where id='+id+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};

exports.updateOutlet = function (args, callback) {
	// body...
	var id = args.id,
		s_name = args.s_name,
		address = args.address;
	var query = 'UPDATE outlet SET s_name=\''+s_name+'\', address=\''+address+'\' WHERE id='+id+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};


