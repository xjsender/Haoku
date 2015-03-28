var jsforce = require("jsforce")
    , session = require("express-session")

exports.query = function(req, res, next) {
    res.render("query");
}

exports.doQuery = function(req, res, next) {
    var soql = req.body.soql;
    console.log(soql);

    var conn = new jsforce.Connection({
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
    });

    conn.query(soql, function(err, resp) {
        if (err) return res.send(err.toString());

        res.send(resp);
    });
}