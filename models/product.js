var config = require('../config/config'),
	connection = config.connection;

exports.getProducts =  function(args, callback) {
	//query
	/*
	{
		query : "none",
		sortby : "ASC/DESC",
		pageNumber
	}
	*/
	var query = 'SELECT barcode, name, category, manufacturer, cost_price FROM ';
		query+= 'product;';
	//var searchParameter = args.query;
	var result = {};
	result['metadata'] = [];
	result['data']= [];
	result['metadata'].push({"name": "barcode", "label" : "Barcode", "datatype" : "string"});
	result['metadata'].push({"name": "name", "label" : "Name", "datatype" : "string"});
	result['metadata'].push({"name": "category", "label" : "Category", "datatype" : "string"});
	result['metadata'].push({"name": "manufacturer", "label" : "Manufacturer", "datatype" : "string"});
	result['metadata'].push({"name": "cost_price", "label" : "Cost Price", "datatype" : "double($,2,dot,comma,1,n/a)"});
	result['metadata'].push({"name": "addinventory", "label" : "Add outlet"});
	

	/*if(searchParameter != 'none') {
		query += ' WHERE s_name LIKE \'%' + searchParameter + '%\' OR name LIKE \'%' + searchParameter + '%\' ';
	}*/
	//query +=';';
	/*var pageNumber = args.pageNumber,
		sortBy = args.sortby,
		resultsPerPage = args.itemperpage,
		order = (args.asc === true) ? 'ASC' : 'DESC';
*/
	//query +=		' ORDER BY name ' + order + ';';*/
	//console.log(query);
	connection.query( query,  function(err, rows, fields) {
		//var idx = 0;
		for (var tuple in rows) {
			var current ={};
			current['id'] = rows[tuple].barcode;
			//idx++;
			current['values'] = rows[tuple];
			result['data'].push(current);
		}
		console.log(result);
		callback(err, result);
	});
};

exports.addProduct = function (args, callback) {
	var name = args.name,
		barcode = args.barcode,
		category = args.category,
		cost_price = args.cost_price,
		manufacturer = args.manufacturer,
		image = args.image;
	var query = 'INSERT INTO product VALUES('+connection.escape(name)+','+connection.escape(category)+
					','+barcode+','+cost_price+','+connection.escape(manufacturer)+','+connection.escape(image)+');';

	connection.query(query, function( err2, rows2, fields2) {
		if(!err2) {
			callback(err2, rows);
		} else {
			console.log("ERROR : " + err2);
			callback(true,null);
		}
	});
	
};

exports.isBarcodeValid = function (args, callback) {
	var barcode = args.barcode;
	var query = 'SELECT * FROM product where barcode='+barcode+' ;';

	connection.query(query, function( err2, rows2, fields2) {
		if(!err2) {
			if(rows2.length === 0)
				callback(err2, true);
			else
				callback(err2, false);
		} else {
			console.log("ERROR : " + err2);
			callback(true,null);
		}
	});
	
};

exports.deleteProduct = function (args, callback) {
	var barcode = args.barcode;
	var query = 'UPDATE inventory SET status=\'DISCONTINUE\' WHERE barcode='+barcode+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		console.log(err);
		callback(err, rows);
	});
};
exports.updateProduct = function (args, callback) {
	// body...
	var name = args.name,
		category = args.category,
		barcode = args.barcode,
		cost_price = args.cost_price,
		manufacturer = args.manufacturer;
	var query = 'UPDATE product SET name='+connection.escape(name)+', category ='+connection.escape(category)+', cost_price='+cost_price+
				', manufacturer='+connection.escape(manufacturer)+' WHERE barcode='+barcode+';';
	connection.query( query, function (err, rows, fields) {
		// body...
		callback(err, rows);
	});
};
