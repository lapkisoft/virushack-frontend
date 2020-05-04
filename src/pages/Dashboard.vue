<template>
    <div class="page page-dashboard" v-if="checklist">
        <router-link to="/todo-list" class="tasks-plank" :class="tasksPlankClassList">
            <div class="icon">
                <img src="/img/icons/warning.svg" alt="">
            </div>

            <div class="label">
                {{ tasksPlankLabel }}
                <br>
                Выполнено {{ completedTaskCount }} / {{ checklist.items.length }}
            </div>
        </router-link>

        <template v-if="personalArticles.length > 0">
            <h3>Рекомендации для пациента</h3>

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
    import './assets/scss/_Dashboard.scss';

    export default {
        name: 'page-dashboard',

        created() {
            this.load();
        },

        data() {
            return {
                date: this.$route.params.date || new Date().toISOString().split('T')[0],
                checklist: null
            };
        },

        computed: {
            completedTaskCount() {
                return this.checklist.items.filter(({completed}) => completed).length;
            },

            allTasksCompleted() {
                return this.checklist.items.length === this.completedTaskCount;
            },

            tasksPlankClassList() {
                return {
                    completed: this.allTasksCompleted
                };
            },

            tasksPlankLabel() {
                return this.allTasksCompleted ? 'Задачи выполнены' : 'Список задач не пройден';
            },

            personalArticles() {
                return [
                    {
                        img: '/img/recommendations/01.png',
                        link: 'https://pro-palliativ.ru/library/video-profilaktika-prolezhnej/'
                    },
                    {
                        img: '/img/recommendations/02.png',
                        link: 'https://pro-palliativ.ru/blog/saharnyj-diabet-v-klinicheskoj-praktike-u-palliativnyh-bolnyh/'
                    },
                    {
                        img: '/img/recommendations/03.png',
                        link: 'https://pro-palliativ.ru/blog/klyuchevye-printsipy-i-tehnologii-nutritivnoj-podderzhki-v-palliativnoj-meditsine/'
                    }
                ];
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
            load() {
                this.getChecklist().then((checklist) => {
                    this.checklist = checklist;

                    console.log(checklist.items);
                });
            },

            getChecklist() {
                return new Promise((resolve, reject) => {
                    this.$api.getCheckList(this.date).then(resolve, () => {
                        this.$api.postCheckList(this.date).then(() => {
                            let promises = [];

                            for (let {type, time, description} of this.defaultItems) {
                                promises.push(this.$api.postCheckItem(type, this.date, time, description));
                            }

                            Promise.all(promises).then(() => {
                                this.$api.getCheckList(this.date).then(resolve, reject);
                            });
                        }, reject);
                    });
                });
            }
        }
    };
</script>
