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

exports.getProductInformation = function(args, callback) {
	var barcode = args;

	if(barcode !== undefined) {
		var query = 'SELECT name,category,manufacturer, image, stock, selling_price from '+
			' product inner join inventory on barcode=product_barcode WHERE barcode='+barcode+' and outlet_id='+onlineid+'; ',
			result = {};


		connection.query(query, function(err,rows,fields){
			if(!err) {
				result['details'] = rows[0];
				var category = rows[0].category;
				//5 products from the same category
				var query2 = ' SELECT name from product where category='+connection.escape(category)+' and barcode<>'+barcode+' limit 5;';
				query2 += ' SELECT distinct s_name from outlet inner join inventory on outlet_id=id and id<>'+onlineid+' ;';
				connection.query(query2, function  (err2,rows2,fields2) {
					// body...
					if(!err2) {
						console.log(rows2);
						result['sameCategory'] = rows2[0];
						result['outlets'] = rows2[1];
						console.log("Output Packet : " + JSON.stringify(result));
						callback(null,result);
					} else {
						console.log(" Error2 : " + err2);
						callback(true,null);
					}
				});
			} else {
				console.log("Error : " + err);
				callback(err,null);
			}
		});
	} else {
		console.log("Invalid or absent parameters");
		callback(true,null);
	}
};