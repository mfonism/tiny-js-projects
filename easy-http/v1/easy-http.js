function EasyHTTP() {

}

EasyHTTP.prototype.getHttpClient = function () {
    return new XMLHttpRequest()
}

EasyHTTP.prototype.get = function (url, callback) {
    const http = this.getHttpClient();

    http.open('GET', url, true);
    http.onload = function (event) {
        // inside this handler the `this` keyword refers to the
        // xmlhttp object
        // unless we're using an arrow function
        // where `this` will be whatever it is in the outer scope
        if (this.status === 200) {
            callback(json = JSON.parse(this.responseText), error = null);
        } else {
            callback(json = null, error = 'Error: ' + this.status);
        }
    };
    http.send();
};

EasyHTTP.prototype.post = function (url, data, callback) {
    const http = this.getHttpClient();

    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onload = function (event) {
        if (this.status === 201) {
            callback(json = JSON.parse(this.responseText), error = null);
        } else {
            callback(json = null, error = 'Error: ' + this.status);
        }
    }
    http.send(JSON.stringify(data));
};

EasyHTTP.prototype.put = function (url, data, callback) {
    const http = this.getHttpClient();

    http.open('PUT', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onload = function (event) {
        if (this.status === 200) {
            callback(json = JSON.parse(this.responseText), error = null);
        } else {
            callback(json = null, error = 'Error: ' + this.status);
        }
    }
    http.send(JSON.stringify(data));
};

EasyHTTP.prototype.delete = function (url, callback) {
    const http = this.getHttpClient();

    http.open('DELETE', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onload = function (event) {
        if (this.status === 200) {
            callback(json = JSON.parse(this.responseText), error = null);
        } else {
            callback(json = null, error = 'Error: ' + this.status);
        }
    }
    http.send();
}
