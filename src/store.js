import Vue from './vue.js';
import Vuex from 'vuex';

import checklistItemTypes from '@/codex/checklist-item-types.json';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    state: {
        defaultItems: [
            {
                type: checklistItemTypes.PULSE_PRESSURE,
                time: '10:00',
                description: JSON.stringify({
                    label: 'Замерить давление и пульс'
                })
            },
            {
                type: checklistItemTypes.TEMPERATURE,
                time: '10:10',
                description: JSON.stringify({
                    label: 'Замерить температуру'
                })
            },
            {
                type: checklistItemTypes.SLEEP,
                time: '10:20',
                description: JSON.stringify({
                    label: 'Указать количество сна больного'
                })
            },
            {
                type: checklistItemTypes.CUSTOM,
                time: '12:00',
                description: JSON.stringify({
                    label: 'Дыхательная гимнастика'
                })
            },
            {
                type: checklistItemTypes.CUSTOM,
                time: '12:00',
                description: JSON.stringify({
                    label: 'Общетонизирующие упражнения',
                    extra: 'general-tonic-exercises'
                })
            },
            {
                type: checklistItemTypes.CUSTOM,
                time: '16:00',
                description: JSON.stringify({
                    label: 'Процедура 1'
                })
            },
            {
                type: checklistItemTypes.CUSTOM,
                time: '18:00',
                description: JSON.stringify({
                    label: 'Процедура 2'
                })
            }
        ]
    },

    mutations: {},

    actions: {
        getChecklist({state}, date) {
            date = date || new Date().toISOString().split('T')[0];

            return new Promise((resolve, reject) => {
                let $api = Vue.prototype.$api;

                $api.getCheckList(date).then(resolve, () => {
                    $api.postCheckList(date).then(() => {
                        let promises = [];

                        for (let {type, time, description} of state.defaultItems) {
                            promises.push($api.postCheckItem(type, date, time, description));
                        }

                        Promise.all(promises).then(() => {
                            $api.getCheckList(date).then(resolve, reject);
                        });
                    }, reject);
                });
            });
        },

        getIndicationList(store, date) {
            date = date || new Date().toISOString().split('T')[0];

            return new Promise((resolve, reject) => {
                let $api = Vue.prototype.$api;

                $api.getIndicationList(date).then(resolve, () => {
                    $api.postIndicationList(date).then(resolve, reject);
                });
            });
        }
    }
});
