import ApiClient from './Client.js';

export default {
    install(Vue, {baseUrl, mocks}) {
        const client = new ApiClient(baseUrl);

        client.addMocks(mocks);

        Vue.prototype.$api = client;
    }
}
