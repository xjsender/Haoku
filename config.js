exports.dev = {
    "clientId": "3MVG9Y6d_Btp4xp5NwcRLAU5Ct6gjXLPoSW43wDXmP0NR5siDu10UMOBMnPip9v02g_emnt1gJetjbnCH9N3y",
    "clientSecret": "6154018842396108114",
    "redirectUri": "http://localhost:3000/oauth/callback"
};

exports.prd = {
    "clientId": "3MVG9Y6d_Btp4xp5NwcRLAU5Ct0KYYb5tqzhfcmTuZ2jFVmU2Ak5uGx0p1auRZLptPq4IB396N4pQ2X7BK5J7",
    "clientSecret": "5291655085722911176",
    "redirectUri": "https://haoku.herokuapp.com/oauth/callback"
};

exports.fields = {
    "Account": ["Name", "Phone", "Website"],
    "Opportunity": ["Name", "StageName", "CloseDate"]
};

exports.apiVersion = "32";