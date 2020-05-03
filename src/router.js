import Vue from './vue.js';
import VueRouter from 'vue-router';

import Todo from './pages/Todo.vue';
import Indications from './pages/Indications.vue';
import Quiz from './pages/Quiz.vue';
import Recommendations from './pages/Recommendations.vue';
import Settings from './pages/Settings.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: Todo.name,
            path: '/todo',
            component: Todo
        },
        {
            name: Indications.name,
            path: '/indications',
            component: Indications
        },
        {
            name: Quiz.name,
            path: '/quiz',
            component: Quiz
        },
        {
            name: Recommendations.name,
            path: '/recommendations',
            component: Recommendations
        },
        {
            name: Settings.name,
            path: '/settings',
            component: Settings
        }
    ]
});

export default router;
