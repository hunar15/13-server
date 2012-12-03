var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb',
  multipleStatements : true
});

function handleDisconnect(connection) {
  connection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    connection = mysql.createConnection(connection.config);
    handleDisconnect(connection);
    connection.connect();
  });
}

handleDisconnect(connection);
exports.connection = connection;
exports.onlineid = 4;
exports.admin = 'admin';
exports.admin_password = 'password';