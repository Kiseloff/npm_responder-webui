import keys from '../config';

const apiHost = process.env.REACT_APP_SERVER_HOST || keys.apiHost;
const apiPort = process.env.REACT_APP_SERVER_PORT || keys.apiPort;

console.log(process.env);

export default class ApiService {
    #apiBase = `http://${apiHost}:${apiPort}/api`;

    #prepareOptions = (method, body) => {
        const options = {};

        // set Headers
        options.headers = {
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };

        // set Method
        options.method = method;

        // set Body
        if (method === 'post' && body) {
            options.body = JSON.stringify(body);
        }

        return options;
    };

    #request = async (path, method = 'get', body = {}) => {
        const url = this.#apiBase.concat(path);
        const options = this.#prepareOptions(method, body);
        const res = await fetch(url, options);

        // Server errors handler
        if (!res.ok) {
            // throw new Error(`Could not fetch ${url}, recieved "${res.status} - ${res.statusText}"`);
            throw new Error(`Recieved "${res.status} - ${res.statusText}"`);
        }

        return await res.json();
    };

    getVersion = async () => {
        return await this.#request(`/version`);
    };

    checkConnectivity = async ip => {
        return await this.#request(`/check?ip=${ip}`);
    };
}
