var jsforce = require("jsforce")
    , session = require("express-session")
    , config = require("../config")
    , util = require("./util");

exports.login = function(req, res, next) {
    oauth2 = req.hostname === "localhost" ? config.dev : config.prd;
    oauth2.loginUrl = req.body.login_url;
    req.session.oauth2 = oauth2;

    oauth2 = new jsforce.OAuth2(req.session.oauth2)
    authorize_url = oauth2.getAuthorizationUrl({scope: 'full'});
    res.redirect(authorize_url);
}

exports.logout = function(req, res, next) {
    req.session.destroy(function() {
        res.locals.session.destroy();
        res.redirect('/');
    });
}

exports.callback = function(req, res, next) {
    var conn = new jsforce.Connection({
        oauth2: req.session.oauth2
    });

    var code = req.query.code;
    conn.authorize(code, function(err, userInfo) {
        if (err) { return console.error(err); }
    
        req.session.accessToken = conn.accessToken;
        req.session.instanceUrl = conn.instanceUrl;

        conn.chatter.resource('/users/me').retrieve(function(err, resp) {
            if (err) return next(err);
            req.session.userInfo = resp;
            res.redirect("/");
        })
    });
}