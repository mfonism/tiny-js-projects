class Github {
    constructor(client_id, client_secret) {
        this.client_id = client_id;
        this.client_secret = client_secret;

        this.API_ROOT = 'https://api.github.com';

        this.repos_count = 10;
        this.repos_sort = 'created: asc';
    }

    getClientQueryString() {
        return `client_id=${this.client_id}&client_secret=${this.client_secret}`
    }

    getReposQueryString() {
        return `per_page=${this.repos_count || 20}&sort=${this.repos_sort || 'created: desc'}`
    }

    async getUser(username) {
        const url = `${this.API_ROOT}/users/${username}?${this.getClientQueryString()}`;
        const resp = await fetch(url);

        if (resp.status !== 200) {
            return {
                status: resp.status,
                requestData: { username: username }
            }
        }

        const respJson = await resp.json();
        return {
            data: respJson,
            status: resp.status
        }
    }

    async getRepos(username) {
        const url = `${this.API_ROOT}/users/${username}/repos?${this.getReposQueryString()}&${this.getClientQueryString()}`;
        const resp = await fetch(url);

        if (resp.status !== 200) {
            return {
                status: resp.status,
                requestData: { username: username }
            }
        }

        const respJson = await resp.json();
        return {
            data: respJson,
            status: resp.status
        }
    }
}
