
/*
 * GET home page.
 */
var inventory = require('../models/inventory'),
	outlet = require('../models/outlet'),
	product = require('../models/product'),
	requests = require('../models/requests');

exports.index = function(req, res){
  inventory.getAllInventory( function(err, result) {
	res.send(result);
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
	product.getProducts( req.body.values, function(err, result ) {
		res.send(result);
	});
};
exports.addProduct = function  (req, res) {
	// body...
	product.addProduct( req.body.values, function(err, result ) {
		res.send(result);
	});
};
exports.deleteProduct = function  (req, res) {
	// body...
	product.deleteProduct( req.body.values, function(err, result ) {
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
	product.updateProduct( req.body.values, function(err, result ) {
		res.send(result);
	});
};


exports.getOutlets = function  (req, res) {
	// body...
	outlet.getOutlets( req.body.values, function(err, result ) {
		res.send(result);
	});
};
exports.addOutlet = function  (req, res) {
	// body...
	//console.log(req.body.stringify() + 'exists !!!!!!');
	var abc = req.body.values;
	outlet.addOutlet( abc, function(err, result ) {
		res.send(result);
	});
};
exports.deleteOutlet = function  (req, res) {
	// body...
	outlet.deleteOutlet( req.body.values, function(err, result ) {
		res.send(result);
	});
};
exports.updateOutlet = function  (req, res) {
	// body...
	outlet.updateOutlet( req.body.values, function(err, result ) {
		res.send(result);
	});
};


exports.getInventory = function  (req, res) {
	// body...
	inventory.getInventory( req.body.values, function(err, result ) {
		res.send(result);
	});
};
exports.addToInventory = function  (req, res) {
	// body...
	inventory.addToInventory( req.body.values, function(err, result ) {
		res.send(result);
	});
};
exports.deleteFromInventory = function  (req, res) {
	// body...
	inventory.deleteFromInventory( req.body.values, function(err, result ) {
		res.send(result);
	});
};
exports.updateInventory = function  (req, res) {
	// body...
	inventory.updateInventory( req.body.values, function(err, result ) {
		res.send(result);
	});
};

exports.getRequests = function  (req, res) {
	// body...
	requests.getRequests( req.body.values, function(err, result ) {
		res.send(result);
	});
};
exports.addRequest = function  (req, res) {
	// body...
	requests.addRequest( req.body.values, function(err, result ) {
		res.send(result);
	});
};
exports.deleteRequest = function  (req, res) {
	// body...
	requests.deleteRequest( req.body.values, function(err, result ) {
		res.send(result);
	});
};
exports.updateRequest = function  (req, res) {
	// body...
	requests.updateRequest( req.body.values, function(err, result ) {
		res.send(result);
	});
};