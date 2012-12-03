var config = require('../config/config'),
	connection = config.connection;


exports.lastWeekPerformance = function (args, callback) {
	var outlet_id = args.outlet_id;
	console.log(outlet_id);
	if(outlet_id) {
		var query = 'select DATE_FORMAT(a.date,\'%Y-%m-%d\') as date, p.name as name, a.revenue as revenue from product p,'+
			'(select t.date as date,d.barcode as barcode, SUM(d.price*d.quantity) ' +
			'as revenue from transaction t inner join transaction_details d on '+
			'd.id=t.id where t.outlet_id='+outlet_id+' and t.date>=subdate(curdate(),7) group by t.date,d.barcode) a where a.revenue >= ALL(select '+
			'SUM(d1.price*d1.quantity) from transaction t1 inner join transaction_details '+
			'd1 on d1.id=t1.id where t1.date=a.date and t1.outlet_id='+outlet_id+' group by d1.barcode) '+
			' and p.barcode=a.barcode group by a.date;';

		connection.query(query, function(err, rows, fields) {
			if(!err) {
				console.log("Retrieval successful!");
				console.log(JSON.stringify(rows));
				callback(null,rows);
			} else {
				console.log("ERROR encountered : " + err);
				callback(true,null);
			}
		});
	} else {
		console.log("Invalid or absent parameters");
		callback(true,null);
	}
};

exports.allOutletsRevenue = function(args,callback) {
	var query =  'Select  o.s_name as name, FORMAT(100*SUM(a.total)/b.t, 2) as percent, FORMAT(SUM(a.total),2) as revenue '+
		'from outlet o, (SELECT t.outlet_id as id, (d.price*d.quantity) as total '+
		'from transaction t inner join transaction_details d on t.id=d.id where t.date>=subdate(curdate(),7)) a, (SELECT  SUM(d1.price*d1.quantity) as t '+
		'from transaction t1 inner join transaction_details d1 on t1.id=d1.id where t1.date>=subdate(curdate(),7)) b where o.id=a.id '+
		'group by o.s_name;';

	connection.query(query, function(err,rows,fields) {
		if(!err) {
			console.log("Retrieval successful!");
			callback(null,rows);
		} else {
			console.log("ERROR encountered : " + err);
			callback(true,null);
		}
	});
};