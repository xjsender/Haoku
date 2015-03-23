var jsforce = require("jsforce")
    , session = require("express-session")
    , config = require("../config")

exports.index = function(req, res, next) {
    res.render('index');
}

exports.about = function(req, res, next) {
    res.render('about');
}

exports.login = function(req, res, next) {
    req.session.oauth2 = {
        loginUrl: req.body.login_url,
        clientId: req.body.client_id,
        clientSecret: req.body.client_secret,
        redirectUri: config.redirect_uri
    }

    console.log(req.session.oauth2);

    oauth2 = new jsforce.OAuth2(req.session.oauth2)
    res.redirect(oauth2.getAuthorizationUrl({scope: 'api'}));
}

exports.logout = function(req, res, next) {
    req.session.destroy(function() {
        res.locals.session.destroy();
        console.log(res.locals.session);
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
        res.redirect('/');
    });
}

exports.query = function(req, res, next) {
    res.render("query", {
        records: []
    });
}

exports.doQuery = function(req, res, next) {
    var soql = req.query.soql;

    if (!req.session || !req.session.accessToken) {
        return res.redirect('/');
    }

    var conn = new jsforce.Connection({
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
    });

    conn.query(soql, function(err, resp) {
        if (err) return next(err);

        res.render("query", {
            records: resp.records
        });
    });
}