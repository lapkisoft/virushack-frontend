import Vue from './vue.js';
import VueRouter from 'vue-router';

import IndicationList from './pages/IndicationList.vue';
import Quiz from './pages/Quiz.vue';
import Recommendations from './pages/Recommendations.vue';
import Settings from './pages/Settings.vue';
import TodoForm from './pages/TodoForm.vue';
import TodoList from './pages/TodoList.vue';
import TodoSettings from './pages/TodoSettings.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: IndicationList.name,
            path: '/indication-list/:date?',
            component: IndicationList
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
        },
        {
            name: TodoForm.name,
            path: '/todo-form',
            component: TodoForm
        },
        {
            name: TodoList.name,
            path: '/todo-list/:date?',
            component: TodoList
        },
        {
            name: TodoSettings.name,
            path: '/todo-settings',
            component: TodoSettings
        }
    ]
});

export default router;
