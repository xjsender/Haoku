var jsforce = require("jsforce")
    , session = require("express-session")
    , _ = require("underscore");

exports.index = function(req, res, next) {
    res.render("query");
}

exports.executeQuery = function(req, res, next) {
    var soql = req.body.soql;

    // Keep the soql history
    if (req.session.soqls && !_.contains(req.session.soqls, soql)) {
        req.session.soqls.push(soql);
    }
    else {
        req.session.soqls = [soql];
    }

    var conn = new jsforce.Connection({
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
    });

    conn.query(soql, function(err, resp) {
        console.log(err);
        if (err) return res.send(err.toString());

        res.send(resp);
    });
}