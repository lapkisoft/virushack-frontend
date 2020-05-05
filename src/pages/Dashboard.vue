<template>
    <div class="page page-dashboard" v-if="checklist">
        <router-link to="/todo-list" class="plank-link" :class="tasksPlankClassList">
            <div class="icon">
                <img :src="allTasksCompleted ? '/img/icons/check.svg' : '/img/icons/warning.svg'" alt="">
            </div>

            <div class="label">
                {{ tasksPlankLabel }}
                <br>
                Выполнено {{ completedTaskCount }} / {{ checklist.items.length }}
            </div>
        </router-link>

        <template v-if="sleepTaskCompleted">
            <h3>Рекомендованные опросы</h3>

            <router-link to="/quiz-norton" class="plank-link">
                <div class="icon">
                    <img src="/img/icons/light.svg" alt="">
                </div>

                <div class="label">
                    Оценка Риска Пролежней (Norton)
                    <br>
                    <span>Очень важно</span>
                </div>
            </router-link>

            <br>
        </template>

        <template v-if="personalArticles.length > 0">
            <h3>Рекомендации для подопечного</h3>

            <ul class="articles">
                <li v-for="(article, i) in personalArticles" :key="i">
                    <a :href="article.link" target="_blank">
                        <img :src="article.img" alt="">
                    </a>
                </li>
            </ul>
        </template>

        <template v-if="baseArticles.length > 0">
            <h3>Общий уход</h3>

            <ul class="articles">
                <li v-for="(article, i) in baseArticles" :key="i">
                    <a :href="article.link" target="_blank">
                        <img :src="article.img" alt="">
                    </a>
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import checklistItemTypes from '@/codex/checklist-item-types.json';

    import './assets/scss/_Dashboard.scss';

    export default {
        name: 'page-dashboard',

        beforeRouteEnter(to, from, next) {
            window.scrollTo(0, 0);

            next();
        },

        created() {
            this.load();
        },

        data() {
            return {
                checklist: null
            };
        },

        computed: {
            completedTaskCount() {
                return this.checklist && this.checklist.items.filter(({completed}) => completed).length;
            },

            allTasksCompleted() {
                return this.checklist && this.checklist.items.length === this.completedTaskCount;
            },

            sleepTaskCompleted() {
                return this.checklist && this.checklist.items.filter(({type, completed}) => completed && type === checklistItemTypes.SLEEP).length > 0;
            },

            tasksPlankClassList() {
                return {
                    danger: !this.allTasksCompleted,
                    success: this.allTasksCompleted
                };
            },

            tasksPlankLabel() {
                return this.allTasksCompleted ? 'Задачи выполнены' : 'Список задач не пройден';
            },

            personalArticles() {
                return [
                    this.sleepTaskCompleted ? {
                        img: '/img/recommendations/01.png',
                        link: 'https://pro-palliativ.ru/library/video-profilaktika-prolezhnej/'
                    } : null,
                    {
                        img: '/img/recommendations/02.png',
                        link: 'https://pro-palliativ.ru/blog/saharnyj-diabet-v-klinicheskoj-praktike-u-palliativnyh-bolnyh/'
                    },
                    {
                        img: '/img/recommendations/03.png',
                        link: 'https://pro-palliativ.ru/blog/klyuchevye-printsipy-i-tehnologii-nutritivnoj-podderzhki-v-palliativnoj-meditsine/'
                    }
                ].filter((i) => !!i);
            },

            baseArticles() {
                return [
                    {
                        img: '/img/recommendations/04.png',
                        link: 'https://pro-palliativ.ru/blog/kak-tyazhelobolnomu-cheloveku-podgotovitsya-k-majskim-vyhodnym-v-2020-godu/'
                    },
                    {
                        img: '/img/recommendations/05.png',
                        link: 'https://pro-palliativ.ru/blog/universalnye-pamyatki-dlya-hospisov-i-palliativnyh-sluzhb/'
                    },
                    {
                        img: '/img/recommendations/06.png',
                        link: 'https://pro-palliativ.ru/blog/navyki-obschenia-s-patsyentami/'
                    }
                ];
            }
        },

        methods: {
            ...mapActions([
                'getChecklist'
            ]),

            load() {
                this.getChecklist().then((checklist) => {
                    this.checklist = checklist;
                });
            }
        }
    };
</script>
