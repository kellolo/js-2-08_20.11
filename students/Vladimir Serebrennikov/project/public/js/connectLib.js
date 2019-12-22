function HTTPRequest(URI, METHOD = 'GET', bodyJSON = null) {
    return new Promise((resolve, reject) => {
        
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    resolve(xhr.responseText);
                } else {
                    console.log(xhr.statusText)
                    reject(xhr.statusText);
                }
            }
        }
        xhr.open(METHOD, URI, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send( typeof(bodyJSON) === 'object' ? JSON.stringify(bodyJSON) : '' );
    });
}

export { HTTPRequest }