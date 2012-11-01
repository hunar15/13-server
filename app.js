
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
  app.set('port', process.env.PORT || 3001);
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

app.post('/add/product',routes.addProduct);
app.post('/add/outlet',function(req,res) {
  console.log(JSON.stringify(req.body.values));
  routes.addOutlet(req,res);
});
app.post('/add/inventory',routes.addToInventory);
app.post('/add/request',routes.addRequest);

app.get('/get/product',routes.getProducts);
app.post('/get/outlet',routes.getOutlets);
app.post('/get/inventory',routes.getInventory);
app.post('/get/request',routes.getRequests);


app.post('/delete/product',routes.deleteProduct);
app.post('/delete/outlet',routes.deleteOutlet);
app.post('/delete/inventory',routes.deleteFromInventory);
app.post('/delete/request',routes.deleteRequest);

app.post('/update/product',routes.updateProduct);
app.post('/update/outlet',routes.updateOutlet);
app.post('/update/inventory',routes.updateInventory);
app.post('/update/request',routes.updateRequest);

app.post('/getDiscontinued', routes.getDiscontinued);
app.post('/getAdded', routes.getAdded);

app.get('/getall', routes.getall);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
