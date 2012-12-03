var config = require('../config/config'),
	connection = config.connection;

exports.viewOutlets = function (callback) {
	// body...
	var query = 'select distinct o.id as id, o.s_name as name from transaction t inner join outlet o on '+
			' t.outlet_id=o.id;';
	var result = {};
	result['metadata'] = [];
	result['data']= [];

	result['metadata'].push({"name":"id","label":"Outlet ID", "datatype" : "integer"});
	result['metadata'].push({"name":"name","label":"Outlet Name", "datatype" : "string"});
	result['metadata'].push({"name":"details","label":"Details"});
	connection.query(query, function  (err, rows, fields) {
		// body...
		if(!err) {
			for( var i in rows) {
				var current ={};
				current['id'] = rows[i]['id'];
				current['values'] = rows[i];
				result['data'].push(current);
			}
			callback(null,result);
		} else {
			console.log(err);
			callback(true,null);
		}
	});
};

exports.viewTransactions = function (args,callback) {
	// body...
	var outlet_id = args.outlet_id;

	var query = 'select id, DATE_FORMAT(date,\'%Y-%m-%d\') as date '+
			' FROM transaction where outlet_id='+outlet_id+' ;';
	var result = {};
	result['metadata'] = [];
	result['data']= [];

	result['metadata'].push({"name":"id","label":"Transaction ID", "datatype" : "integer"});
	result['metadata'].push({"name":"date","label":"Transaction Date", "datatype" : "date"});
	result['metadata'].push({"name":"details","label":"Details"});
	connection.query(query, function  (err, rows, fields) {
		// body...
		if(!err) {
			for( var i in rows) {
				var current ={};
				current['id'] = rows[i]['id'];
				current['values'] = rows[i];
				result['data'].push(current);
			}
			console.log(result);

			callback(null,result);
		} else {
			console.log(err);
			callback(true,null);
		}
	});
};

exports.viewTransactionDetails = function (args,callback) {
	// body...
	var id = args.id,
		outlet_id=  args.outlet_id;
	console.log(id);
	if(id!==null) {
		var query = 'select barcode,quantity,price from transaction_details where id='+id+' AND outlet_id='+outlet_id+';';
		var result = {};
		result['metadata'] = [];
		result['data']= [];

		result['metadata'].push({"name":"barcode","label":"Barcode", "datatype" : "string"});
		result['metadata'].push({"name":"quantity","label":"Quantity", "datatype" : "double(,0,dot,comma,1,n/a)"});
		result['metadata'].push({"name":"price","label":"Price", "datatype" : "string"});
		connection.query(query, function  (err, rows, fields) {
			// body...
			if(!err) {
				for( var i in rows) {
					var current ={};
					current['id'] = rows[i]['barcode'];
					current['values'] = rows[i];
					result['data'].push(current);
				}
				console.log(result);

				callback(null,result);
			} else {
				console.log(err);
				callback(true,null);
			}
		});
	} else {
		console.log("Invalid or absent parameters");
		callback(true,null);
	}
};

exports.pushTransactions = function (args,callback) {
	// body...
	var outlet_id = args.outletid,
		t_list = args.transaction;

	if(outlet_id!==null && t_list !== null) {
		if(t_list.length !== 0) {
			var t_query = '',
				d_query = '';

			for(var i in t_list) {
				var current = t_list[i];
				t_query += 'INSERT INTO transaction Select '+ current.id + ',' + outlet_id+',CURDATE() from dual '+
						' WHERE NOT EXISTS( select * from transaction t where t.id='+current.id+' AND t.outlet_id='+outlet_id+');';
				d_query += 'INSERT INTO transaction_details Select '+ current.id+','+outlet_id+','+current.barcode+','+current.quantity+','+current.price+' from dual '+
						' WHERE NOT EXISTS( select * from transaction_details t where t.id='+current.id+' AND t.outlet_id='+outlet_id+' AND t.barcode='+current.barcode+');';
			}

			connection.query(t_query, function  (err,rows,fields) {
				// body...
				if(!err) {
					connection.query(d_query, function  (err2,rows2,fields2) {
						// body...
						if(!err2) {
							console.log("TRANSACTIONS synced successfully");
							callback(null,{ status : 'ADDED'});
						} else {
							console.log("ERROR : "+err2);
							callback(true,null);
						}
					});
				} else {
					console.log("ERROR : "+err);
					callback(true,null);
				}
			});
		} else {
			console.log("No Transactions to sync");
			callback(null,{ status : 'ADDED'});
		}
	} else {
		console.log("Invalid or absent parameters");
		callback(true,null);
	}
};