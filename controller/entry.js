var jsforce = require("jsforce")
    , session = require("express-session")
    , _ = require("underscore")._;

exports.index = function(req, res, next) {
    if (req.query && req.query.accessToken) {
        req.session.accessToken = req.query.accessToken;
        req.session.instanceUrl = req.query.instanceUrl;
        req.session.userName = req.query.userName;
    }
    
    res.render('index');
}

exports.about = function(req, res, next) {
    res.render('about');
}

exports.json = function(req, res, next) {
    res.render('json');
}