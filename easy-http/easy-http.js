function EasyHTTP() {
    this.http = new XMLHttpRequest();
}

EasyHTTP.prototype.get = function (url, callback) {
    this.http.open('GET', url, true);
    this.http.onload = function (event) {
        // inside the handler the `this` keyword refers to the
        // xmlhttp object
        // unless we're using an arrow function
        // where `this` will be whatever it is in the outer scope
        if (this.status === 200) {
            callback(json = JSON.parse(this.responseText), error = null);
        } else {
            callback(json = null, error = 'Error: ' + this.status);
        }
    };
    this.http.send();
};

EasyHTTP.prototype.post = function (url, data, callback) {
    this.http.open('POST', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');
    this.http.onload = function (event) {
        if (this.status === 201) {
            callback(json = JSON.parse(this.responseText), error = null);
        } else {
            callback(json = null, error = 'Error: ' + this.status);
        }
    }
    this.http.send(JSON.stringify(data));
};

EasyHTTP.prototype.put = function (url, data, callback) {
    this.http.open('PUT', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');
    this.http.onload = function (event) {
        if (this.status === 200) {
            callback(json = JSON.parse(this.responseText), error = null);
        } else {
            callback(json = null, error = 'Error: ' + this.status);
        }
    }
    this.http.send(JSON.stringify(data));
};

EasyHTTP.prototype.delete = function (url, callback) {
    this.http.open('DELETE', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');
    this.http.onload = function (event) {
        if (this.status === 200) {
            callback(json = JSON.parse(this.responseText), error = null);
        } else {
            callback(json = null, error = 'Error: ' + this.status);
        }
    }
    this.http.send();
}
