var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb',
  multipleStatements : true
});

exports.connection = connection;
exports.onlineid = 4;
exports.admin = 'admin';
exports.admin_password = 'password';