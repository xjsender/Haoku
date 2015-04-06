var jsforce = require("jsforce")
    , session = require("express-session")
    , config = require("../config")

exports.index = function(req, res, next) {
    res.render('rest', {
        rest_uri: "/services/data/v" + config.apiVersion + "/sobjects"
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

    console.log(_request);

    var conn = new jsforce.Connection({
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
    });

    conn.request(_request, function(err, resp) {
        if (err) return res.send(err.toString());
        res.send(resp)
    })
}