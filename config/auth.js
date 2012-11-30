// # Auth variables
var auth = function(){
  if (process.env.NODE_ENV == "production") {
    // Use Production App API Keys
    return {
      fb: {
        appId: '135656873253305',
        appSecret: '6b41df206074685b46888333a4e89925'
      },
      google: {
        appId: '',
        appSecret: '',
        scope: ''
      }
    };
  } else {
    // Use Dev App API Keys
    return {
      fb: {
        appId: '108157856018291',
        appSecret: '314a16a3c25199a521a5e036f7bee75a'
      },
      google: {
        appId: '',
        appSecret: '',
        scope: ''
      }
    };
  }
};

exports.auth = auth();