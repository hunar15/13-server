var config = require('../../config/config'),
	connection = config.connection,
	onlineid = config.onlineid;

exports.findUserById = function (id, callback) {
	var fbid = id;

	if(fbid !== undefined) {
		var query = 'SELECT * from account where fbid='+connection.escape(fbid)+' ;';

		connection.query(query, function  (err,rows,fields) {
			// body...
			if(!err) {
				console.log("Result : " + JSON.stringify(rows[0]));
				callback(null,rows[0]);
			} else {
				console.log("Error : " + err);
				callback(true,null);
			}
		});
	} else {
		console.log("Invalid or absent parameers");
		callback(true,null);
	}
};

exports.findOrCreateUser = function (args, callback) {
	var fbid = args.id,
		name = args.name,
		email = args.email;

	if(args !== undefined) {
		var query = 'INSERT INTO account(name,email,fbid) SELECT '+ connection.escape(name) + ','+connection.escape(email)+
				',' + connection.escape(fbid)+' FROM DUAL WHERE NOT EXISTS (SELECT * from account a where a.fbid='+connection.escape(fbid)+'); ';
		query += 'SELECT * from account where fbid='+connection.escape(fbid)+' ;';

		connection.query(query, function  (err,rows,fields) {
			// body...
			if(!err) {
				console.log("Result : " + rows[1][0].name);
				callback(null,rows[1][0]);
			} else {
				console.log("Error : " + err);
				callback(err,null);
			}
		});
	} else {
		console.log("Invalid or absent parameers");
		callback(true,null);
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

exports.updatePhone = function (user,args, callback) {
	// body...
	var fbid = user.fbid,
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

exports.updateAddress = function (user, args, callback) {
	// body...
	var fbid = user.fbid,
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