var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb',
  multipleStatements : true
});


exports.lastWeekPerformance = function (args, callback) {
	var outlet_id = args.outlet_id;

	if(outlet_id!==null) {
		var query = 'SELECT p.name as name, r.revenue as revenue, r.date as date from revenue r inner join product p on p.barcode'+
					' = r.barcode WHERE r.outlet_id=' +outlet_id+' AND r.date>=SUBDATE(CURDATE(),7);';

		connection.query(query, function(err, rows, fields) {
			if(!err) {
				console.log("Retrieval successful!");
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