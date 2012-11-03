var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb'
});

exports.getAllOutlets = function  (callback) {
	// body...

	var query = 'select id,s_name, address FROM outlet;';

	var result = {};
	result['metadata'] = [];
	result['data']= [];

	result['metadata'].push({"name": "id", "label" : "Outlet ID", "datatype" : "integer"});
	result['metadata'].push({"name": "s_name", "label" : "Shop Name", "datatype" : "string"});
	result['metadata'].push({"name": "address", "label" : "Address", "datatype" : "string"});
	connection.query(query, function  (err, rows, fields) {
		// body...
		for( var i in rows) {
			var current = {};
			current['id'] = rows[i]['p.barcode'];
			current['values'] = rows[i];
			result['data'].push(current);
		}
		callback(err, result);
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


