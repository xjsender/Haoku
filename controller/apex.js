var jsforce = require("jsforce")
    , session = require("express-session")

exports.index = function(req, res, next) {
    res.render('apex');
}

exports.executeAnonymous = function(req, res, next) {
    var conn = new jsforce.Connection({
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
    });

    console.log(req.body);

    conn.tooling.executeAnonymous(req.body.apexCode, function(err, resp) {
        if (err) return res.send(err.toString());
        res.send(resp)
    })
}