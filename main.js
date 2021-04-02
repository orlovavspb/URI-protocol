var params = document.location.href;
var protocol = "oo-office";
var onSuccess = function() {
    console.log('Success');
}
var onError = function() {
    console.log('Error');
}
var timeoutMs1 = 2000;
var uri = protocol + ':' + params;
var timeoutMs = timeoutMs1 || 1000;

var isBrowserSupported = false;
var isCatchEvent = false;

function openApp(protocol, params, onSuccess, onError, timeoutMs)
{
    console.log('URL page: ' + params); //разделил на три вывода в консоль, чтобы скриншот был красивый
    console.log('add: ' + protocol);
    console.log('URI: ' + uri);
    function createIframe(target, uri) {
        var iframe = target.createElement("iframe");
        iframe.src = uri;
        iframe.id = "hiddenIframe";
        iframe.style.display = "none";
        target.body.appendChild(iframe);
        return iframe;
    }
    function unsupportedCb() {
        console.log("Browser is not supported");
    }

    var isBrowserSupported = false;
    var isCatchEvent = false;

    //chrome89 and firefox87 and edge89 on win10 - WORK
    //https://github.com/ONLYOFFICE/sdkjs/blob/fix/openApp/common/utils/openApp.js
    if (true) {                                                                     //без проверки браузера
        isBrowserSupported = true;
        var iframe = document.querySelector("#hiddenIframe");
        if (!iframe) {
            iframe = createIframe(document, "about:blank");
        }
        try {
            iframe.contentWindow.location.href = uri;
            setTimeout(function () {
                try {
                    if (iframe.contentWindow.location.protocol === "about:") {
                        onSuccess();
                    } else {
                        onError();
                    }
                } catch (e) {
                    if (e.name === "NS_ERROR_UNKNOWN_PROTOCOL" || e.name === "NS_ERROR_FAILURE" || e.name === "SecurityError") {
                        onError();
                    }
                }
            }, timeoutMs);
        } catch (e) {
            if (e.name === "NS_ERROR_UNKNOWN_PROTOCOL" || e.name === "NS_ERROR_FAILURE" || e.name === "SecurityError") {
                onError();
            }
        }
    }
}
openApp(protocol, params, onSuccess, onError, timeoutMs);
