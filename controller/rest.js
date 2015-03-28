var jsforce = require("jsforce")
    , session = require("express-session")

exports.rest = function(req, res, next) {
    var conn = new jsforce.Connection({
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
    });

    res.render('rest', {
        rest_uri: "/services/data/v" + conn.version + "/sobjects",
        resp: {}
    });
}

exports.executeRest = function(req, res, next) {
    var _request = {
        url: req.body.url,
        method: req.body.method,
        body: req.body.body,
        headers : {
            "Content-Type" : "application/json"
        }
    }

    var conn = new jsforce.Connection({
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
    });

    conn.request(_request, function(err, resp) {
        if (err) return res.send(err);
        res.send(resp)
    })
}