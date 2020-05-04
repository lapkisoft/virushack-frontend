<template>
    <div id="app" :class="classList">
        <header>
            <nav>
                <div class="menu-button-wrapper">
                    <button @click.prevent="toggleMenu">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </button>
                </div>

                <div class="back-button-wrapper" v-if="prevRouteName">
                    <router-link :to="{name: prevRouteName}">
                        <img src="/img/icons/arrow-left.svg" alt="">
                    </router-link>
                </div>
            </nav>

            <div class="menu-wrapper" @click.self.prevent="toggleMenu(false)">
                <menu>
                    <li>
                        <router-link @click.native="toggleMenu(false)" to="/todo-list">
                            Чек-лист на сегодня
                        </router-link>
                    </li>
                    <li>
                        <router-link @click.native="toggleMenu(false)" to="/indication-list">
                            Измерения
                        </router-link>
                    </li>
                    <li>
                        <router-link @click.native="toggleMenu(false)" to="/quiz">
                            Опрос состояния больного
                        </router-link>
                    </li>
                    <li>
                        <router-link @click.native="toggleMenu(false)" to="/recommendations">
                            Рекомендации
                        </router-link>
                    </li>
                    <li>
                        <router-link @click.native="toggleMenu(false)" to="/settings">
                            Настройка
                        </router-link>
                    </li>
                </menu>
            </div>
        </header>

        <main>
            <router-view/>
        </main>
    </div>
</template>

<script>
    import '@/assets/scss/_layout.scss';

    const prevRouteMap = {
        'page-todo-list': 'page-main',
        'page-indication-list': 'page-main',
        'page-quiz': 'page-main',
        'page-settings': 'page-main',
        'page-recommendations': 'page-main',
        'page-indication-add': 'page-indication-list',
        'page-indication-form': 'page-indication-add',
        'page-todo-settings': 'page-todo-list',
        'page-todo-form': 'page-todo-settings'
    };

    export default {
        created() {
            this.onRoute(this.$route);

            this.$router.beforeEach((to, from, next) => {
                this.onRoute(to);

                next();
            });
        },

        mounted() {
            window.addEventListener('scroll', () => {
                this.page_scrolled = window.scrollY > 0;
            });
        },

        data() {
            return {
                page_scrolled: false,
                menu_opened: false,
                route_name: null
            };
        },

        computed: {
            classList() {
                return {
                    'page-scrolled': this.page_scrolled,
                    'menu-opened': this.menu_opened
                };
            },

            prevRouteName() {
                return this.route_name && prevRouteMap[this.route_name] || null;
            }
        },

        methods: {
            toggleMenu(state = null) {
                if (typeof state !== 'boolean') {
                    state = !this.menu_opened;
                }

                this.menu_opened = state;
            },

            onRoute(route) {
                this.route_name = route.name;
            }
        }
    };
</script>
