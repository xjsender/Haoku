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
    var rest_uri = req.body.rest_uri;
    var _request = {
        url: rest_uri,
        method: req.body.rest_method,
        body: req.body.rest_body,
        headers : {
            "Content-Type" : "application/json"
        }
    }

    var conn = new jsforce.Connection({
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
    });

    conn.request(_request, function(err, resp) {
        if (err) {
            res.locals.hasMessage = true;
            res.locals.messages = err;

            return res.render('rest', {
                rest_uri: rest_uri,
                resp: []
            });
        }

        res.render('rest', {
            rest_uri: rest_uri,
            resp: resp
        });
    })
}