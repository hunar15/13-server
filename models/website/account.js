var config = require('../../config/config'),
	connection = config.connection,
	onlineid = config.onlineid;

exports.findUserById = function (args, callback) {
	var fbid = args;

	if(fbid !== undefined) {

	} else {
		 
	}
};

exports.findOrCreateUser = function (args, callback) {
	var fbid = args;

	if(fbid !== undefined) {

	} else {
		 
	}
};

exports.getDetails = function (args, callback) {
	// body...
	var fbid = args.fbid;

	if(fbid !== null) {
		var query = 'SELECT * FROM account '+
			' WHERE fbid=' + connection.escape(fbid) + ' ;';
		
		connection.query(query, function (err, rows, fields) {
			// body...
			if(!err) {
				console.log(rows);
				callback(null,rows);
			} else {
				callback(err,true);
			}
		});
	} else {
		console.log("Invalid or absent parameers");
		callback(true,null);
	}
};

exports.updatePhone = function (args, callback) {
	// body...
	var fbid = args.fbid,
		phone = args.phone;

	if(fbid !== undefined && phone!== undefined) {
		var query = 'UPDATE account set phone='+ phone +
			' WHERE fbid=' + connection.escape(fbid) + ' ;';
		
		connection.query(query, function (err, rows, fields) {
			// body...
			if(!err) {
				console.log(rows);
				callback(null,rows);
			} else {
				callback(err,true);
			}
		});
	} else {
		console.log("Invalid or absent parameers");
		callback(true,null);
	}
};

exports.updateAddress = function (args, callback) {
	// body...
	var fbid = args.fbid,
		address = args.address;

	if(fbid !== undefined && address!== undefined) {
		var query = 'UPDATE account set address='+ connection.escape(address) +
			' WHERE fbid=' + connection.escape(fbid) + ' ;';
		
		connection.query(query, function (err, rows, fields) {
			// body...
			if(!err) {
				console.log(rows);
				callback(null,rows);
			} else {
				callback(err,true);
			}
		});
	} else {
		console.log("Invalid or absent parameers");
		callback(true,null);
	}
};