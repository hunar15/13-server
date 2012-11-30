var config = require('../../config/config'),
	connection = config.connection,
	onlineid = config.onlineid;

exports.getAllInventory = function  (callback) {
	// body...
	var query = 'SELECT barcode,name,category, manufacturer, stock' +
			', selling_price, image FROM ' +
			' product INNER JOIN inventory on barcode = product_barcode' +
			' INNER JOIN outlet ON id = outlet_id WHERE id='+onlineid+' and stock > 0;';

	connection.query(query, function  (err, rows, fields) {
		// body...
		if(!err) {
			callback(null, rows);
		} else {
			callback(err, null);
		}
	});
};

exports.searchInventory = function  (args,callback) {
	// body...

	var para = args.para;

	if(para !== undefined)	{
		console.log("para : " + para);
		var query = 'SELECT distinct barcode,name,category, manufacturer, stock' +
			', selling_price, image FROM ' +
			' product INNER JOIN inventory on barcode = product_barcode' +
			' INNER JOIN outlet ON id = outlet_id WHERE id='+onlineid+' and stock > 0 and '+
			' (barcode like \'%'+para+'%\' or name like \'%'+para+'%\' or '+
			' category like \'%'+para+'%\' or manufacturer like \'%'+para+'%\' '+
			' );';

		connection.query(query, function  (err, rows, fields) {
			// body...
			if(!err) {
				console.log(" Rows : " + rows);
				callback(null, rows);
			} else {
				console.log("Error : " + err);
				callback(err, null);
			}
		});
	} else {
		console.log("Invalid or absent parameers");
		callback(true,null);
	}

};

exports.recomputePrice = function (callback) {

};