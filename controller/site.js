var jsforce = require("jsforce")
    , session = require("express-session")
    , config = require("../config");

var oauth2 = new jsforce.OAuth2(config);

exports.index = function(req, res, next) {
    res.render('index');
}

exports.login = function(req, res, next) {
    res.redirect(oauth2.getAuthorizationUrl({scope: 'api'}));
}

exports.callback = function(req, res, next) {
    var conn = new jsforce.Connection({oauth2: oauth2});
    var code = req.query.code;
    conn.authorize(code, function(err, userInfo) {
        if (err) { return console.error(err); }
 
        req.session.accessToken = conn.accessToken;
        req.session.instanceUrl = conn.instanceUrl;
        res.redirect('/');
    });
}