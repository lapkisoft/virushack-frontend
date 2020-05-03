import Vue from '../vue.js';
import VueApiPlugin from './api/plugin.js';
import mocks from '../mocks/index.js';

Vue.use(VueApiPlugin, {
    mocks,

    baseUrl: '/api'
});
