const DBC_CURRENT_URL = window.location.href;
function dbc_extractHostname(url) {
    let hostname;
    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
}
function dbc_extractRootDomain(url) {
    let domain = dbc_extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
}

let dbc_hostname = dbc_extractRootDomain(DBC_CURRENT_URL);

chrome.runtime.sendMessage({action: 'GetHostDeals', host: dbc_hostname}, function (response) {

});