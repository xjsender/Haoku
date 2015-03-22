var jsforce = require("jsforce")
    , session = require("express-session");

var oauth2;

exports.index = function(req, res, next) {
    res.render('index');
}

exports.about = function(req, res, next) {
    res.render('about');
}

exports.login = function(req, res, next) {
    oauth2 = new jsforce.OAuth2({
        loginUrl: req.body.login_url,
        clientId: req.body.client_id,
        redirectUri: req.body.redirect_uri
    })

    console.log(oauth2);

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