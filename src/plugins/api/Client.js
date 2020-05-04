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

    request(method, uri, query, body) {
        return this.restClient.request(method, uri, query, body);
    }

    fetch(uri, query = {}) {
        return this.restClient.get(uri, query);
    }

    // check-list

    /**
     * @param {String} date
     * @returns {Promise | Promise<unknown>}
     */
    getCheckList(date) {
        return this.fetch('/checklists', {date});
    }

    /**
     * @param {String} date
     * @returns {Promise | Promise<unknown>}
     */
    postCheckList(date) {
        return this.request('POST', '/checklists', null, {
            date
        });
    }

    // check-item

    getCheckItems(query) {
        return this.fetch('/checklist-items', query);
    }

    /**
     * @param {String} id
     * @returns {Promise | Promise<unknown>}
     */
    getCheckItemById(id) {
        return this.fetch(`/checklist-items/${id}`);
    }

    /**
     * @param {String} type
     * @param {String} date
     * @param {String} time
     * @param {String} description
     * @returns {Promise | Promise<unknown>}
     */
    postCheckItem(type, date, time = null, description = null) {
        return this.request('POST', '/checklist-items', null, {
            type,
            date,
            time,
            description
        });
    }

    deleteCheckItem(id) {
        return this.request('DELETE', `/checklist-items/${id}`);
    }

    /**
     * @param {String} id
     * @param {String} type
     * @param {String} date in format YYYY-MM-DD
     * @param {String} time in format H:i:s
     * @param {Boolean} completed
     * @param {String} description
     * @returns {Promise | Promise<unknown>}
     */
    patchCheckItem(id, type, date, time = null, completed = false, description = null) {
        return this.request('PATCH', `/checklist-items/${id}`, null, {
            type,
            date,
            completed,
            time,
            description
        });
    }

    // indication-list

    getIndicationList(date) {
        return this.fetch('/indications-lists', {date});
    }

    postIndicationList(date) {
        return this.request('POST', '/indications-lists', null, {date});
    }

    // indication pulse pressure

    postIndicationPulsePressure(date, low, high, pulse) {
        return this.request('POST', '/pulse-pressure', null, {
            date,
            low,
            high,
            pulse
        });
    }

    deleteIndicationPulsePressure(id) {
        return this.request('DELETE', `/pulse-pressure/${id}`);
    }

    // indication temperature

    postIndicationTemperature(date, temperature) {
        return this.request('POST', '/temperature', null, {
            date,
            temperature
        });
    }

    deleteIndicationTemperature(id) {
        return this.request('DELETE', `/temperature/${id}`);
    }

    // indication sleep

    postIndicationSleep(date, startAt, endAt, wokeUpAtNight, isBadSleep, isLongSleep) {
        return this.request('POST', '/sleep', null, {
            date,
            startAt,
            endAt,
            wokeUpAtNight,
            isBadSleep,
            isLongSleep
        });
    }

    deleteIndicationSleep(id) {
        return this.request('DELETE', `/sleep/${id}`);
    }

    getDichIndicationList(query = {}) {
        return this.fetch('/dich-indication-list', query);
    }

    getDichTodoList(query = {}) {
        return this.fetch('/dich-todo-list', query);
    }

    getDichTodoSettings(query = {}) {
        return this.fetch('/dich-todo-settings', query);
    }
}

export default Client;
