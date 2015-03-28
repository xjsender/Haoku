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

var error_div = '<div class="code-result alert alert-dismissable alert-danger">' + 
        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
        '<div><strong class="title">Error :</strong></div><div class="output">' +
            '<pre>{0}</pre>' +
        '</div>' +
    '</div>';