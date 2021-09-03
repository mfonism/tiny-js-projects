const http = new EasyHTTP();
const API_ROOT = 'https://jsonplaceholder.typicode.com/albums/';

http.get(API_ROOT)
    .then(data => console.log(data))
    .catch(err => console.log(err))
    ;

const postPayload = {
    userId: 1,
    title: 'a new album title'
};
http.post(API_ROOT, postPayload)
    .then(data => console.log(data))
    .catch(err => console.log(err))
    ;

const putPayload = {
    userId: 99,
    title: 'an edited title'
};
const putUrl = API_ROOT + '1';
http.put(putUrl, putPayload)
    .then(data => console.log(data))
    .catch(err => console.log(err))
    ;

const deleteUrl = API_ROOT + '1';
http.delete(deleteUrl)
    .then(data => console.log(data))
    .catch(err => console.log(err))
    ;

