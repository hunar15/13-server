var config = require('../../config/config'),
	connection = config.connection,
	onlineid = config.onlineid;

exports.getAllInventory = function  (callback) {
	// body...
	var query = 'SELECT barcode,name,category, manufacturer, stock' +
			', selling_price, image FROM ' +
			' product INNER JOIN inventory on barcode = product_barcode' +
			' INNER JOIN outlet ON id = outlet_id WHERE id=4 and stock > 0;';

	connection.query(query, function  (err, rows, fields) {
		// body...
		if(!err) {
			callback(null, rows);
		} else {
			callback(err, null);
		}
	});
};