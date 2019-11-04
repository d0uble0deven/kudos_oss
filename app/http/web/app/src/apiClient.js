import axios from 'axios';

const BASE_URI = 'http://localhost:4433';

const client = axios.create({
    baseURL: BASE_URI,
    json: true
});

class APIClient {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    createKudo(repo) {
        return this.perform('post', '/kudos', repo);
    }




}