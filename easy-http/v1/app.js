const http = new EasyHTTP();
const API_ROOT = 'https://jsonplaceholder.typicode.com/photos';

http.get(API_ROOT, function (json, error) {
    if (json !== null) {
        console.log('GET: responded normally!');
        console.log(json);
    } else {
        console.log('GET: responded with an error');
        console.log(error);
    }
});

const postPayload = {
    'albumId': 1,
    'title': 'life on mars',
    'url': 'https://mfonism.com/123',
    'thumbnailUrl': 'https://thumbnail.mfonism.com/123'
};
http.post(API_ROOT, postPayload, function (json, error) {
    if (json !== null) {
        console.log('POST: responded normally!');
        console.log(json);
    } else {
        console.log('POST: responded with an error');
        console.log(error);
    }
});

const putPayload = {
    'albumId': 1000,
    'title': 'No title, really',
    'url': 'https://mfonism.com/123',
    'thumbnailUrl': 'https://thumbnail.mfonism/com/123'
};
const putUrl = API_ROOT + '/' + 1;
http.put(putUrl, putPayload, function (json, error) {
    if (json !== null) {
        console.log('PUT: responded normally!');
        console.log(json);
    } else {
        console.log('PUT: responded with an error');
        console.log(error);
    }
});

const delUrl = API_ROOT + '/' + 1;
http.delete(delUrl, function (json, error) {
    if (json !== null) {
        console.log('DELETE: responded normally!');
        console.log(json);
    } else {
        console.log('DELETE: responded with an error');
        console.log(error);
    }
});
