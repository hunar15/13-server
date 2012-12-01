var config = require('../config/config'),
	connection = config.connection;

exports.getAllOutlets = function  (callback) {
	// body...

	var query = 'select * FROM outlet;';

	var result = {};
	result['metadata'] = [];
	result['data']= [];

	result['metadata'].push({"name": "id", "label" : "Outlet ID", "datatype" : "string"});
	result['metadata'].push({"name": "s_name", "label" : "Shop Name", "datatype" : "string", editable: "true"});
	result['metadata'].push({"name": "address", "label" : "Address", "datatype" : "string", editable: "true"});
	result['metadata'].push({"name": "latitude", "label" : "Latitude", "datatype" : "float", editable: "true"});
	result['metadata'].push({"name": "longitude", "label" : "Longitude", "datatype" : "float", editable: "true"});
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

exports.getAllOutletsNoMeta = function  (callback) {
	// body...

	var query = 'select * FROM outlet;';

	connection.query(query, function  (err, rows, fields) {
		// body...
		if(!err) {
			/*for( var i in rows) {
				var current = rows[i];
				console.log(current);
				f(parseFloat(current['longitude']) >= 0) {
					current['longitude'] = parseFloat(current['longitude']) + " E";
				} else {
					current['longitude'] = parseFloat(current['longitude']) + " W";
				}
				if(parseFloat(current['latitude']) >= 0) {
					current['latitude'] = parseFloat(current['latitude']) + " N";
				} else {
					current['latitude'] = parseFloat(current['latitude']) + " S";
				}
			}*/
			callback(null, rows);
		} else {
			console.log("Error : " + err);
			callback(true,null);
		}
		
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
		address = args.address,
		latitude = args.latitude,
		longitude = args.longitude;

	var query = '';
	if( latitude != undefined && longitude != undefined) {
		query ='INSERT INTO outlet(s_name,address,longitude,latitude) VALUES('+connection.escape(s_name)+
			','+connection.escape(address)+','+longitude+','+latitude+');';
	} else {
		query ='INSERT INTO outlet(s_name,address) VALUES('+connection.escape(s_name)+
			','+connection.escape(address)+');';
	}
	
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
	console.log(query);
	connection.query( query, function (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};

exports.updateOutlet = function (args, callback) {
	// body...
	var id = args.id,
		s_name = args.s_name,
		address = args.address,
		latitude = args.latitude,
		longitude = args.longitude;
	var query = 'UPDATE outlet SET s_name='+connection.escape(s_name)+', address='+
			connection.escape(address)+', latitude = '+latitude+', longitude='+longitude+' WHERE id='+id+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};


