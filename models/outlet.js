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
	result['metadata'].push({"name": "delete", "label": "Delete"});
	connection.query(query, function  (err, rows, fields) {
		// body...
		for( var i in rows) {
			var current = {};
			console.log(current);
			current['id'] = rows[i]['id'];
			current['values'] = rows[i];
			result['data'].push(current);
		}
		callback(err, result);
	});
};

exports.getOutletsByProduct = function(args, callback) {
	var barcode = args.barcode;
	console.log(barcode);
	if(barcode !== null ) {
		console.log('entered condition');
		var query = "select distinct outlet_id, s_name from inventory,outlet WHERE outlet.id = inventory.outlet_id AND product_barcode=" + barcode + " AND status NOT LIKE \'DISCONTINUE\';";

		connection.query(query,function(err,rows,fields) {
			if(err) {
				console.log("Error encountered : " + err);
				callback(true,null);
			} else {
				callback(null,rows);
			}
		});
	} else {
		console.log("Invalid or absent parameters");
		callback(true,null);
	}
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
	var query = 'DELETE FROM outlet where id="'+id+'";';
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


