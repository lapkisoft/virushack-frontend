import RestClient from './RestClient.js';

class Client {
    constructor(baseUrl) {
        this.restClient = new RestClient(baseUrl);

        /**
         * Auto-bind `this` as actual context for all `get***` methods
         */
        Object.getOwnPropertyNames(Client.prototype)
            .filter(name => name.indexOf('get') === 0 && name.length > 3)
            .filter(name => typeof Client.prototype[name] === 'function')
            .forEach(name => {
                this[name] = this[name].bind(this);
            });
    }

    addMocks(mocks) {
        this.restClient.addMocks(mocks);
    }

    buildQuery(query = {}) {
        if (query.filter && typeof query.filter === 'object') {
            query.filter = JSON.stringify(query.filter);
        }

        if (query.order && typeof query.order === 'object') {
            query.order = JSON.stringify(query.order);
        }

        return query;
    }

    request(method, uri, query, body) {
        return this.restClient.request(method, uri, this.buildQuery(query), body);
    }

    fetch(uri, query = {}) {
        return this.restClient.get(uri, this.buildQuery(query)).then(({status, data, total, messages}) => ({
            data,
            messages,
            status,
            total
        }));
    }

    getIndicationList(query = {}) {
        return this.fetch('/indication-list', query);
    }

    getTodoList(query = {}) {
        return this.fetch('/todo-list', query);
    }

    getTodoSettings(query = {}) {
        return this.fetch('/todo-settings', query);
    }
}

export default Client;
