import qs from 'qs';

function stringify(from) {
    if (from === null || from === undefined) {
        return null;
    }

    if (from instanceof FormData) {
        return null;
    }

    if (typeof from === 'string') {
        return from;
    }

    if (typeof from === 'object') {
        return qs.stringify(from);
    }

    return null;
}

function buildUrl(baseUrl, uri, query) {
    uri = `/${uri}`.replace(/\/{2,}/g, '/');

    let url = baseUrl + uri,
        queryString = stringify(query);

    if (typeof queryString === 'string' && queryString.length > 0) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryString;
    }

    return url;
}

function buildFetchOptions(method, body, headers = {}) {
    method = method.toUpperCase();
    headers = typeof headers === 'object' && headers !== null ? headers : {};

    let options = {
        mode: 'cors',
        method: method,
        headers: headers,
        credentials: 'include',
        cache: 'default'
    };

    if (['POST', 'PUT', 'PATCH'].indexOf(method) !== -1) {
        if (body instanceof FormData) {
            options.body = body;
        } else if (typeof body === 'object' && body !== null) {
            options.body = JSON.stringify(body);
            options.headers['Accept'] = 'application/json';
            options.headers['Content-Type'] = 'application/json; charset=UTF-8';
        } else if (typeof body === 'string') {
            options.body = body;
        }
    }

    return options;
}

export default class RestClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.mocks = {};
    }

    addMocks(mocks) {
        this.mocks = {
            ...this.mocks,
            ...mocks
        };
    }

    request(method, uri, query = null, body = null, headers = {}) {
        let url = buildUrl(this.baseUrl, uri, query),
            options = buildFetchOptions(method, body, headers);

        if (this.mocks[uri]) {
            return new Promise((resolve) => {
                resolve(JSON.parse(JSON.stringify(this.mocks[uri])));
            });
        }

        return new Promise((resolve, reject) => {
            fetch(url, options).then((response) => {
                if (!response.ok) {
                    return reject(response.statusText);
                }

                response.json().then((json) => resolve(json), () => reject('Response not in json format'));
            }, () => reject('Request failed'));
        });
    }

    get(uri, query = null) {
        return this.request('GET', uri, query);
    }

    post(uri, query = null, body = null) {
        return this.request('POST', uri, query, body);
    }

    put(uri, query = null, body = null) {
        return this.request('PUT', uri, query, body);
    }

    delete(uri, query) {
        return this.request('DELETE', uri, query);
    }
}
