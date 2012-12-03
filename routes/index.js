
/*
 * GET home page.
 */
var inventory = require('../models/inventory'),
	outlet = require('../models/outlet'),
	product = require('../models/product'),
	requests = require('../models/requests'),
	statistics = require('../models/statistics'),
	transaction = require('../models/transaction'),
	website_inventory = require('../models/website/inventory'),
	website_transaction = require('../models/website/transaction'),
	website_account = require('../models/website/account'),
	email = require('emailjs'),
	server  = email.server.connect({
		user:    "13cg3002",
		password:"gmailsync",
		host:    "smtp.gmail.com",
		ssl:     true
	});

var sql = require('mysql');
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hqdb',
  multipleStatements : true
});

exports.getInventorySize = function (req,res) {
	// body...
	inventory.getInventorySize(req.body,function (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.isAdmin = function  (req,res) {
	// body...
	website_account.isAdmin(req.body, function (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.isBarcodeValid = function  (req,res) {
	// body...
	product.isBarcodeValid(req.body, function (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.website_viewAllTransactions = function (req,res) {
	// body...
	website_transaction.viewAllTransactions(function (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.website_setAsReceived = function (req,res) {
	// body...
	website_transaction.setAsReceived(req.body, function (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.pushInventoryToHQ = function (req,res) {
	// body...
	inventory.pushInventoryToHQ(req.body, function (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.getAllOutletsNoMeta = function (req,res) {
	// body...
	outlet.getAllOutletsNoMeta( function (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.website_productInformation = function (req,res) {
	// body...
	website_inventory.getProductInformation(req.param('barcode'), function (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.website_dispatchTransaction = function (req,res) {
	website_transaction.dispatchTransaction(req.body,function(err,result){
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.sendEmail = function (req,res) {
	console.log(JSON.stringify(req.user));
	/*server.send({
		text:    "i hope this works",
		from:    "<13cg3002@gmail.com>",
		to:      "Hunar Khanna <hunur.khanna@gmail.com>",
		subject: "testing emailjs"
	}, function(err, message) {
		console.log(err || message);
		if(!err)
			res.send({"STATUS" : "SUCCESS"});
		else
			res.send({"STATUS" : "ERROR"});
	});*/
};
exports.website_findOrCreate = function  (req,res) {
	// body...
	website_account.findOrCreateUser( req.body, function  (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.website_findUserById = function  (req,res) {
	// body...
	website_account.findUserById( req.body.id, function  (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.website_updateAccountPhone = function  (req,res) {
	// body...
	website_account.updatePhone(req.user, req.body, function  (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.website_updateAccountAddress = function  (req,res) {
	// body...
	website_account.updateAddress(req.user, req.body, function  (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.website_getAccountDetails = function  (req,res) {
	// body...
	console.log(req.user);
	website_account.getDetails( req.user, function  (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.website_viewTransactions = function  (req,res) {
	// body...
	console.log(req.user);
	website_transaction.viewTransactions( req.user, function  (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.website_viewTransactionDetails = function  (req,res) {
	// body...
	website_transaction.viewTransactionDetails( req.body, function  (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.website_processTransaction = function  (req,res) {
	// body...
	website_transaction.processTransaction(req.user, req.body, function  (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.website_searchInventory = function  (req,res) {
	// body...
	website_inventory.searchInventory(req.body, function  (err,result) {
		// body...
		if(!err) {
			console.log(result);
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.website_viewProducts = function  (req,res) {
	// body...
	website_inventory.getAllInventory( function  (err,result) {
		// body...
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.viewTransactionByOutlets = function(req,res) {
	// body...
	transaction.viewOutlets( function (err,result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.viewTransactions = function(req,res) {
	// body...
	transaction.viewTransactions(req.body, function (err,result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.viewTransactionDetails = function(req,res) {
	// body...
	transaction.viewTransactionDetails(req.body, function (err,result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
exports.pushTransactions = function(req,res) {
	// body...
	transaction.pushTransactions(req.body, function (err,result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.pullDispatchedRequests = function(req,res) {
	// body...
	requests.pullDispatchedRequests(req.body, function (err,result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.outletReceived = function (req,res) {
	requests.outletReceived(req.body,function (err, result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};

exports.outletReceivedAll = function (req,res) {
	requests.outletReceivedAll(req.body,function (err, result) {
		if(!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
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

exports.syncInventoryAck = function (req,res) {
	// body...
	var outlet_id = req.body.outletid;

	if(outlet_id !== null) {
		var query = '';
		query += 'UPDATE inventory set status=\'NORMAL\' where status=\'ADDED\' or status=\'UPDATED\'AND outlet_id='+outlet_id+' ;';
		query += 'UPDATE inventory set status=\'DISCONTINUED\' where status=\'DISCONTINUE\' AND outlet_id='+outlet_id+' ;';

		connection.query(query,function (err,rows,fields) {
			// body...
			if(!err) {
				res.send({"STATUS" : "SUCCESS"});
			} else {
				res.send({"STATUS" : "ERROR"});
			}
		});
	} else {
		console.log("Invalid or absent parameters");
		res.send({"STATUS" : "ERROR"});
	}
};
function sendRes(res,list) {
	res.send({list : list});
}
exports.syncAll = function(req,res) {
	var outlet_id = req.body.data.outletid,
		index = req.body.index,
		length = req.body.length,
		result= {};
		result.STATUS ='SUCCESS';

	if(outlet_id !== null) {
		var query = '',
			list = [];

		query = 'SELECT name,category,barcode,cost_price,manufacturer,selling_price,min_stock,status '+
			'from product inner join inventory on barcode=product_barcode where status=\'ADDED\''+
			' AND outlet_id='+outlet_id+' ORDER BY barcode LIMIT '+index+', '+length+' ;';

		query += 'SELECT * from inventory where status<>\'NORMAL\' and status<>\'ADDED\' '+
			'and status<>\'DISCONTINUED\' AND outlet_id='+outlet_id+' ORDER BY product_barcode LIMIT '+index+', '+length+' ;';

		connection.query(query,function (err,rows,fields) {
			// body...
			if(!err) {
				for(var i in rows[0]) {
					list.push(rows[0][i]);
				}
				for(var j in rows[1]) {
					list.push(rows[1][j]);
				}
				result.list = list;
				//console.log(JSON.stringify(list));
				console.log(list.length);
				res.send(result);
			//	sendRes(res,list);
			} else {
				console.log("Error in processing query : "+err);
				res.send({"STATUS" : "ERROR"});
			}
		});
	/*	for(var i in list) {
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
		});*/
	} else {
		console.log("Invalid or absent parameters");
		res.send({"STATUS" : "ERROR"});
	}
};

exports.pushNewRequests = function(req, res){
  requests.pushNewRequests(req.body, function(err, result) {
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

exports.approveBatchRequest = function(req, res) {
	requests.approveBatchRequest(req.body, function(err,result) {
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