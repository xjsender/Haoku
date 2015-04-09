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

['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp',
 'Element',
 'NaN',
 'Infinite'
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

function queryString(key){
    var paras = location.search;
    if(paras){
        var arr = paras.substr(1).split("&"),data;
        for(i in arr){
            data = arr[i].split("=");
            if(data[0] == key){
                return data[1]
            }
        }
    }
}