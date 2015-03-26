/**
 * Execute AJAX Request
 * @param     {string}     method       GET or POST
 * @param     {string}     url          Request URL
 * @param     {function}   callback     callback function
 * @param     {boolean}    async        true or false
 * @return
 */
function executeAJAX(method, url, callback, async) {
    // If async is not defined, set it as false
    if (!async) async = false;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (callback) callback();
        }
    }

    xmlhttp.open(method, url, async);
    xmlhttp.send();
}