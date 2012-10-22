
/**
 * Module dependencies.
 */

var express = require('express'),
   routes = require('./routes'),
   user = require('./routes/user'),
   http = require('http'),
   path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'views')));
  app.engine('html', require('ejs').renderFile);
});


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/add/product',routes.addProduct);
app.get('/add/outlet',routes.addOutlet);
app.get('/add/inventory',routes.addToInventory);
app.get('/add/request',routes.addRequest);

app.get('/get/product',routes.getProducts);
app.get('/get/outlet',routes.getOutlets);
app.get('/get/inventory',routes.getInventory);
app.get('/get/request',routes.getRequests);


app.get('/delete/product',routes.deleteProduct);
app.get('/delete/outlet',routes.deleteOutlet);
app.get('/delete/inventory',routes.deleteFromInventory);
app.get('/delete/request',routes.deleteRequest);

app.get('/update/product',routes.updateProduct);
app.get('/update/outlet',routes.updateOutlet);
app.get('/update/inventory',routes.updateInventory);
app.get('/update/request',routes.updateRequest);


app.get('/getall', routes.getall);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
