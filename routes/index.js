
/*
 * GET home page.
 */
var inventory = require('../models/inventory'),
	outlet = require('../models/outlet'),
	product = require('../models/product'),
	requests = require('../models/requests'),
	statistics = require('../models/statistics');
var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb',
  multipleStatements : true
});


exports.allOutletsRevenue = function(req,res) {
	statistics.allOutletsRevenue(req.body, function(err,result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.lastWeekPerformance = function(req,res) {
	statistics.lastWeekPerformance(req.body, function(err,result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.syncAll = function(req,res) {
	var outlet_id = req.body.outletid,
		list = req.body.inventory;

	if(list!==null  && outlet_id !== null) {
		var query = '';

		for(var i in list) {
			var current = list[i];

			query += 'UPDATE inventory SET stock='+current['stock']+', selling_price='+current['selling_price']+
					' WHERE product_barcode='+current['barcode'] + ' AND outlet_id=' +outlet_id+' ;';
		}

		connection.query(query, function(err,rows,fields) {
			if(!err) {
				console.log("Inventory of Outlet ID : " + outlet_id + " synced");
				res.send({"STATUS" : "SUCCESS"});
			} else {
				console.log("Error encountered : " + err);
				res.send({"STATUS" : "ERROR"});
			}
		});
	} else {
		console.log("Invalid or absent parameters");
		res.send({"STATUS" : "ERROR"});
	}
};
exports.syncRevenue = function(req, res) {
	var body = req.body;
	var outlet_id = body['outlet_id'],
		date = body['date'].split('T')[0];

	if(body !== null) {
		var query = 'INSERT INTO revenue SELECT '+outlet_id+','+body['revenue']+','+body['barcode']+',\''+
				date + '\' FROM DUAL WHERE NOT EXISTS( SELECT * FROM revenue WHERE outlet_id='+outlet_id+' AND '+
				' date=\''+date+'\');';
		console.log(query);
		connection.query(query, function(err, rows, fields) {
			if(!err) {
				console.log("Revenue from Outlet ID : " + outlet_id + " synced");
				res.send({"STATUS" : "SUCCESS"});
			} else {
				console.log("Error encountered");
				console.log("ERROR : " + err);
				res.send({"STATUS" : "ERROR"});
			}
		});
	} else {
		console.log("Invalid or missing parameters");
		res.send({"STATUS" : "ERROR"});
	}
};

exports.syncAddedRequests = function(req, res){
  requests.syncAddedRequests(req.body, function(err, result) {
	res.send(result);
  });
};
exports.getNotSelling = function(req,res) {
	inventory.getNotSelling(req.body, function(err, result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.syncReceivedRequests = function(req, res){
  requests.syncReceivedRequests(req.body, function(err, result) {
	res.send(result);
  });
};

exports.approveBatchRequest = function(req, res) {
	requests.approveBatchRequest(req.body, function(err,result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.syncUpdated = function(req,res) {
	inventory.syncUpdated(req.body, function(err,result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.getAllInventory = function(req, res){
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
	console.log(req.body);
	outlet.getOutletsByProduct(req.body, function (err,result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.getAllRequests = function (req,res) {
	// body...
	requests.getBatch( req.body, function(err, result) {
		if(!err) {
			console.log(result);
			res.send(result);
		} else
			res.send(err);
	});
};
exports.getRequestsByOutlet = function (req,res) {
	// body...
	requests.getBatchByOutlet( req.body, function(err, result) {
		if(!err) {
			console.log(result);
			res.send(result);
		} else
			res.send(err);
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
	outlet.getAllOutlets(function(err, result ) {
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