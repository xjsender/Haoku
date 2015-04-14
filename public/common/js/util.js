String.prototype.format = function() {
    var args = arguments;

    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] :
            '{' + number + '}';
    });
};

var type = function (o){
    var s = Object.prototype.toString.call(o);
        return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

[
    'Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 
    'Boolean', 'Function', 'RegExp', 'Element', 'NaN', 'Infinite'
].forEach(function (t) {
    type['is' + t] = function (o) {
        return type(o) === t.toLowerCase();
    };
});

var error_div = 
    '<div class="alert alert-danger alert-dismissable" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
        '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
        '<span class="sr-only">Error:</span>' +
        '{0}' +
    '</div>';

var parseId = function(url) {
    lastIndexOfSlash = url.lastIndexOf("/");
    return url.substr(lastIndexOfSlash + 1, url.length);
}

/**
 * Get parameter from location search
 * @param   {string}  key  Parameter name
 * @return  {string}       Parameter value
 */
function getURLParameter(key){
    var search = location.search;

    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = search.substr(search.indexOf("\?") + 1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}