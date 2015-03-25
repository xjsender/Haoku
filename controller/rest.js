var jsforce = require("jsforce")
    , session = require("express-session")

exports.rest = function(req, res, next) {
    var conn = new jsforce.Connection({
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
    });

    console.log(conn);
    res.render('rest', {
        rest_uri: "/services/data/v" + conn.version
    });
}

exports.executeRest = function(req, res, next) {
    console.log(req.body);
    res.render('rest');
}