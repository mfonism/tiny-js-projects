class EasyHTTP {
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(data))
        });
    }

    post(url, payload) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(data))
        });
    }

    put(url, payload) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(data))
        });
    }

    delete(url) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }
}
