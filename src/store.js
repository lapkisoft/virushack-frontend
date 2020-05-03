import Vue from './vue.js';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {},
    mutations: {},
    actions: {}
});
