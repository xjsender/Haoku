var jsforce = require("jsforce")
    , session = require("express-session")
    , config = require("../config")

exports.index = function(req, res, next) {
    res.render('rest', {
        "rest": {
            "uri": "/services/data/v" + config.apiVersion + ".0/sobjects",
            "header": {
                "Content-Type": "application/json",
                "Authorization": "OAuth " + req.session.accessToken,
                "Accept": "application/json"
            }
        }
    });
}

exports.executeRest = function(req, res, next) {
    var _request = {
        url: req.body.url,
        method: req.body.method,
        body: req.body.body,
        headers : JSON.parse(req.body.header)
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