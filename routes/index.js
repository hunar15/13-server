
/*
 * GET home page.
 */
var inventory = require('../models/inventory'),
	outlet = require('../models/outlet'),
	product = require('../models/product'),
	requests = require('../models/requests');

exports.index = function(req, res){
  res.redirect('/index.html');
};


exports.getProducts = function  (req, res) {
	// body...
	product.getProducts( req.args, function(err, result ) {
		res.send(result);
	});
};
exports.addProduct = function  (req, res) {
	// body...
	product.addProduct( req.args, function(err, result ) {
		res.send(result);
	});
};
exports.deleteProduct = function  (req, res) {
	// body...
	product.deleteProduct( req.args, function(err, result ) {
		res.send(result);
	});
};
exports.updateProduct = function  (req, res) {
	// body...
	product.updateProduct( req.args, function(err, result ) {
		res.send(result);
	});
};


exports.getOutlets = function  (req, res) {
	// body...
	outlet.getOutlets( req.args, function(err, result ) {
		res.send(result);
	});
};
exports.addOutlet = function  (req, res) {
	// body...
	outlet.addOutlet( req.args, function(err, result ) {
		res.send(result);
	});
};
exports.deleteOutlet = function  (req, res) {
	// body...
	outlet.deleteOutlet( req.args, function(err, result ) {
		res.send(result);
	});
};
exports.updateOutlet = function  (req, res) {
	// body...
	outlet.updateOutlet( req.args, function(err, result ) {
		res.send(result);
	});
};


exports.getInventory = function  (req, res) {
	// body...
	inventory.getInventory( req.args, function(err, result ) {
		res.send(result);
	});
};
exports.addToInventory = function  (req, res) {
	// body...
	inventory.addToInventory( req.args, function(err, result ) {
		res.send(result);
	});
};
exports.deleteFromInventory = function  (req, res) {
	// body...
	inventory.deleteFromInventory( req.args, function(err, result ) {
		res.send(result);
	});
};
exports.updateInventory = function  (req, res) {
	// body...
	inventory.updateInventory( req.args, function(err, result ) {
		res.send(result);
	});
};

exports.getRequests = function  (req, res) {
	// body...
	requests.getRequests( req.args, function(err, result ) {
		res.send(result);
	});
};
exports.addRequest = function  (req, res) {
	// body...
	requests.addRequest( req.args, function(err, result ) {
		res.send(result);
	});
};
exports.deleteRequest = function  (req, res) {
	// body...
	requests.deleteRequest( req.args, function(err, result ) {
		res.send(result);
	});
};
exports.updateRequest = function  (req, res) {
	// body...
	requests.updateRequest( req.args, function(err, result ) {
		res.send(result);
	});
};