var _ = require("underscore")._
    , session = require("express-session")
    , jsforce = require("jsforce")

exports.list = function(req, res, next) {
    if (!req.session || !req.session.accessToken) {
        res.render('account/list', {
            data : []
        });
    }

    var conn = new jsforce.Connection({
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
    });

    var query = "SELECT Id, Name, (SELECT Id, Name FROM Opportunities) " +
        "FROM Account WHERE Id IN (SELECT AccountId FROM Opportunity)";
    conn.query(query, function(err, accs) {
        if (err) {
            return next(err);
        }
    
        rows = []
        accs.records.forEach(function(acc) {
            data = {
                "id": acc.Id,
                "text": acc.Name
            }

            if (acc.Opportunities) {
                opps = [];
                acc.Opportunities.records.forEach(function(opp) {
                    opps.push({
                        "id": opp.Id,
                        "text": opp.Name
                    })
                })

                data.children = opps;
            }

            rows.push(data)
        })

        res.render('account/list', {
            data : rows
        });
    });
}

exports.view = function(req, res, next) {
    var conn = new jsforce.Connection({
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
    });

    accId = req.params.id;

    var query = "SELECT Id, Name FROM Account WHERE Id = '" + accId + "'";
    conn.query(query, function(err, accs) {
        res.render("account/view", {
            acc : JSON.stringify(accs.records[0])
        })
    })
}