
/*
 * GET home page.
 */
var inventory = require('../models/inventory'),
	outlet = require('../models/outlet'),
	product = require('../models/product'),
	requests = require('../models/requests');

exports.syncAddedRequests = function(req, res){
  requests.syncAddedRequests(req.body, function(err, result) {
	res.send(result);
  });
};
exports.syncReceivedRequests = function(req, res){
  requests.syncReceivedRequests(req.body, function(err, result) {
	res.send(result);
  });
};
exports.index = function(req, res){
  inventory.getAllInventory( function(err, result) {
	res.send(result);
  });
};
exports.setAsReceived = function(req,res) {
	requests.setAsReceived(req.body, function (err, result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.getOutletsByProduct = function (req,res) {
	// body...
	outlet.getOutletsByProduct(req.body, function (err,result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.getRequestDetails = function(req, res) {
	requests.getBatchDetails( req.body, function(err, result) {
		if(!err) {
			console.log(result);
			res.send(result);
		} else
			res.send(err);
	});
};
 
exports.getDiscontinued = function (req, res) {
	// body...
	inventory.getDiscontinued( req.body,function(err, result) {
		res.send(result);
	});
};

exports.getAdded = function (req, res) {
	// body...
	inventory.getAdded( req.body,function(err, result) {
		res.send(result);
	});
};
exports.getProducts = function  (req, res) {
	// body...
	product.getProducts( req.body, function(err, result ) {
		res.send(result);
	});
};
exports.addProduct = function  (req, res) {
	// body...
	product.addProduct( req.body, function(err, result ) {
		res.send(result);
	});
};
exports.deleteProduct = function  (req, res) {
	// body...
	product.deleteProduct( req.body, function(err, result ) {
		if(err) {
			return res.send({
				status:"error",
				message: err
			});
		}
		else {
			res.send({
			status: "success",
			result: result
			});
		}
		res.send(result);
	});
};
exports.updateProduct = function  (req, res) {
	// body...
	product.updateProduct( req.body, function(err, result ) {
		res.send(result);
	});
};


exports.getOutlets = function  (req, res) {
	// body...
	outlet.getOutlets( req.body, function(err, result ) {
		res.send(result);
	});
};
exports.addOutlet = function  (req, res) {
	// body...
	//console.log(req.body.stringify() + 'exists !!!!!!');
	var abc = req.body;
	outlet.addOutlet( abc, function(err, result ) {
		res.send(result);
	});
};
exports.deleteOutlet = function  (req, res) {
	// body...
	outlet.deleteOutlet( req.body, function(err, result ) {
		res.send(result);
	});
};
exports.updateOutlet = function  (req, res) {
	// body...
	outlet.updateOutlet( req.body, function(err, result ) {
		res.send(result);
	});
};


exports.getInventory = function  (req, res) {
	// body...
	inventory.getInventory( req.body, function(err, result ) {
		res.send(result);
	});
};
exports.addToInventory = function  (req, res) {
	// body...
	inventory.addToInventory( req.body, function(err, result ) {
		res.send(result);
	});
};
exports.deleteFromInventory = function  (req, res) {
	// body...
	inventory.deleteFromInventory( req.body, function(err, result ) {
		res.send(result);
	});
};
exports.updateInventory = function  (req, res) {
	// body...
	inventory.updateInventory( req.body, function(err, result ) {
		res.send(result);
	});
};

exports.getRequests = function  (req, res) {
	// body...
	requests.getBatch( req.body, function(err, result ) {
		res.send(result);
	});
};
exports.addRequest = function  (req, res) {
	// body...
	requests.addRequest( req.body, function(err, result ) {
		res.send(result);
	});
};
exports.deleteRequest = function  (req, res) {
	// body...
	requests.deleteRequest( req.body, function(err, result ) {
		res.send(result);
	});
};
exports.updateRequest = function  (req, res) {
	// body...
	requests.updateRequest( req.body, function(err, result ) {
		res.send(result);
	});
};