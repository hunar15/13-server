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
	var searchParameter = args.query;

	if(searchParameter != 'none') {
		query += ' WHERE s_name LIKE \'%' + searchParameter + '%\' ';
	}
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


