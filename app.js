
/**
 * Module dependencies.
 */

var express = require('express'),
   routes = require('./routes'),
   user = require('./routes/user'),
   http = require('http'),
   path = require('path'),
   auth = require('./models/auth/auth'),
   everyauth = require('everyauth');
var _ = require('underscore');
var redis = _.find( process.argv, function( arg ){
  return arg === "--noredis";
});
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('#%$^&BLAabkkajnsd'));
  if (redis) {
    app.use(express.session());
  } else {
    var Redisstore = require('connect-redis')(express);
    var sessionstore = new Redisstore();
    app.use(express.session({
      store: sessionstore,
      cookie: {maxAge: 1000 * 60 * 60 * 24 * 14}
    }));
  }
  app.use(everyauth.middleware());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'views')));
});


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/testIndex', function (req,res){
  res.sendFile("views/index.html");
});

app.post('/add/product',routes.addProduct);
app.post('/add/outlet',function(req,res) {
  console.log(JSON.stringify(req.body.values));
  routes.addOutlet(req,res);
});
app.post('/add/inventory',routes.addToInventory);
app.post('/add/request',routes.addRequest);

app.get('/get/product',routes.getProducts);
app.get('/get/outlet',routes.getOutlets);
app.get('/get/inventory',routes.getInventory);
app.get('/get/inventory/all',routes.getAllInventory);
app.post('/get/inventory/notSelling',routes.getNotSelling);
app.get('/get/request/all',routes.getAllRequests);
app.post('/get/request/byOutlet',routes.getRequestsByOutlet);
app.post('/get/requestDetails', routes.getRequestDetails);
app.post('/request/approve', routes.approveBatchRequest);

app.post('/delete/product',routes.deleteProduct);
app.post('/delete/outlet',routes.deleteOutlet);
app.post('/delete/inventory',routes.deleteFromInventory);
app.post('/delete/request',routes.deleteRequest);

app.post('/update/product',routes.updateProduct);
app.post('/update/outlet',routes.updateOutlet);
app.post('/update/inventory',routes.updateInventory);
app.post('/update/request',routes.updateRequest);

app.get('/transaction/outlets',routes.viewTransactionByOutlets);
app.post('/transactions',routes.viewTransactions);
app.post('/transaction/details',routes.viewTransactionDetails);
app.get('/allOutletsRevenue',routes.allOutletsRevenue);
app.post('/syncTransactions',routes.syncTransactions);
app.post('/syncAll', routes.syncAll);
app.post('/getLastWeeksPerformance',routes.lastWeekPerformance);
app.post('/syncRevenue',routes.syncRevenue);
app.post('/getDiscontinued', routes.getDiscontinued);
app.post('/getAdded', routes.getAdded);
app.post('/syncUpdated',routes.syncUpdated);
app.post('/syncDispatchedRequests',routes.syncDispatchedRequests);
app.post('/syncAddedRequests', routes.syncAddedRequests);
app.post('/syncReceivedRequests', routes.syncReceivedRequests);
app.post('/syncIncompleteRequests', routes.syncIncompleteRequests);
app.get('/getall', routes.getall);
app.post('/setAsReceived', routes.setAsReceived);
app.post('/getOutletsByProduct',routes.getOutletsByProduct);
//console.log("lets go!!!");

//website routes
app.get('/website/viewProducts',routes.website_viewProducts);
app.post('/website/processTransaction', routes.website_processTransaction);
app.get('/website/viewTransactions', routes.website_viewTransactions);
app.post('/website/viewTransactionDetails', routes.website_viewTransactionDetails);
app.post('/website/dispatchTransaction',routes.website_dispatchTransaction);
app.post('/website/searchInventory',routes.website_searchInventory);
app.get('/website/getAccountDetails',routes.website_getAccountDetails);
app.post('/website/updateAccountPhone',routes.website_updateAccountPhone);
app.post('/website/updateAccountAddress',routes.website_updateAccountAddress);

//email route
app.get('/sendTestMail',routes.sendEmail);

//testing routes
app.post('/website/findOrCreateUser',routes.website_findOrCreate);
app.post('/website/findUserById',routes.website_findUserById);
app.get('/website/product/:barcode',routes.website_productInformation);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
