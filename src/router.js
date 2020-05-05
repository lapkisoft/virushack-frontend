import Vue from './vue.js';
import VueRouter from 'vue-router';

import Main from './pages/Main.vue';
import IndicationAdd from './pages/IndicationAdd.vue';
import IndicationForm from './pages/IndicationForm.vue';
import IndicationList from './pages/IndicationList.vue';
import Quiz from './pages/Quiz.vue';
import Recommendations from './pages/Recommendations.vue';
import TodoForm from './pages/TodoForm.vue';
import TodoList from './pages/TodoList.vue';
import TodoSettings from './pages/TodoSettings.vue';
import Registration from './pages/Registration.vue';
import Dashboard from './pages/Dashboard';
import DiseaseDynamics from './pages/DiseaseDynamics.vue';
import QuizNorton from './pages/QuizNorton.vue';
import QuizNortonResults from './pages/QuizNortonResults.vue';
import Support from './pages/Support.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: Main.name,
            path: '/',
            component: Main
        },
        {
            name: Dashboard.name,
            path: '/dashboard',
            component: Dashboard
        },
        {
            name: DiseaseDynamics.name,
            path: '/disease-dynamics/:type?',
            component: DiseaseDynamics
        },
        {
            name: Registration.name,
            path: '/registration',
            component: Registration
        },
        {
            name: IndicationAdd.name,
            path: '/indication-add',
            component: IndicationAdd
        },
        {
            name: IndicationForm.nameForType,
            path: '/indication-form-type/:type',
            component: IndicationForm
        },
        {
            name: IndicationForm.nameForItem,
            path: '/indication-form-item/:item_id',
            component: IndicationForm
        },
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
            name: QuizNorton.name,
            path: '/quiz-norton',
            component: QuizNorton
        },
        {
            name: QuizNortonResults.name,
            path: '/quiz-norton-results/:result',
            component: QuizNortonResults
        },
        {
            name: Support.name,
            path: '/support',
            component: Support
        },
        {
            name: Recommendations.name,
            path: '/recommendations',
            component: Recommendations
        },
        {
            name: Registration.name + '-settings',
            path: '/settings',
            component: Registration
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
