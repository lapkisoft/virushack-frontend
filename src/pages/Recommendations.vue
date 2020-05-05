<template>
    <div class="page page-recommendations">
        <h1>Рекомендации</h1>

        <div class="search-wrapper">
            <input type="search" class="form-control" placeholder="Поиск">
        </div>

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

        <h3>Вся база знаний</h3>

        <ul class="links">
            <li v-for="(item, i) in links" :key="i">
                <a :href="item.link" target="_blank">{{ item.title }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import checklistItemTypes from '@/codex/checklist-item-types.json';

    import './assets/scss/_Recommendations.scss';

    export default {
        name: 'page-recommendations',

        created() {
            this.load();
        },

        data() {
            return {
                checklist: null,
                links: [
                    {
                        title: 'Паллиативная помощь',
                        link: 'https://pro-palliativ.ru/category/palliativnaya-pomosch/'
                    },
                    {
                        title: 'Обезболивание',
                        link: 'https://pro-palliativ.ru/category/obezbolivanie/'
                    },
                    {
                        title: 'Симптоматическое лечение',
                        link: 'https://pro-palliativ.ru/category/simptomaticheskoe-lechenie/'
                    },
                    {
                        title: 'Уход',
                        link: 'https://pro-palliativ.ru/category/uhod/'
                    },
                    {
                        title: 'Общение',
                        link: 'https://pro-palliativ.ru/category/obschenie/'
                    }
                ]
            };
        },

        computed: {
            sleepTaskCompleted() {
                return this.checklist && this.checklist.items.filter(({type, completed}) => completed && type === checklistItemTypes.SLEEP).length > 0;
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
