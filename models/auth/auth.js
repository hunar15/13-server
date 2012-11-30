var config = require('../../config/config'),
	connection = config.connection;

var everyauth = require('everyauth');
var db = require('../models/db');
var conf = require('../../config/auth').auth();

everyauth.debug = true;
everyauth.everymodule.findUserById( function (userId, callback) {
  db.findUserById(userId, callback);
});

//fb
everyauth.facebook
  .appId(conf.fb.appId)
  .appSecret(conf.fb.appSecret)
  .handleAuthCallbackError( function (req, res) {
    // TODO
    console.log("callback error");

  })
  .findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
    var user = fbUserMetadata;
    user.type = 'fb';
    user.accessToken = accessToken;
    //expects promise
    currentAccessToken = accessToken;
    var promise = new this.Promise();
    db.findOrCreateUser(user, function(err, result){
      if (err) {
        console.log(err);
        return promise.fail(err);
      } else {
        return promise.fulfill(user);
      }
    });
    return promise;
  })
  .scope('email')
  .entryPath('/auth/facebook')
  .callbackPath('/auth/facebook/callback')
  .redirectPath('/main');

everyauth.google
  .appId(conf.google.appId)
  .appSecret(conf.google.appSecret)
  .scope(conf.google.scope)
  .handleAuthCallbackError(function(req,res){
    console.log("callback error google");
  })
  .findOrCreateUser(function (session, accessToken, accessTokenExtra, googleUserMetadata){
    var user = googleUserMetadata;
    user.type = 'google';
    user.accessToken = accessToken;
    var promise = new this.Promise();
    console.log(googleUserMetadata);
    db.findOrCreateUser(user,function(err,result){
      if (err) {
        console.log(err);
        return promise.fail(err);
      } else {
        return promise.fulfill(user);
      }
    });
    return promise;
  })
  .entryPath('/auth/google')
  .callbackPath('/auth/google/callback')
  .redirectPath('/main');
everyauth.everymodule.handleLogout( function (req, res) {
  // The logout method is added for you by everyauth, too
  req.logout();
  return res.redirect('/');
});

