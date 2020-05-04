<template>
    <div id="app" :class="classList">
        <header>
            <nav>
                <div class="back-button-wrapper">
                    <router-link @click.native="toggleMenu(false)" to="/settings">
                        <i class="fa fa-user-circle"></i>
                    </router-link>
                </div>

                <div class="menu-button-wrapper">
                    <button @click.prevent="toggleMenu">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </button>
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

    export default {
        data() {
            return {
                menu_opened: false
            };
        },

        computed: {
            classList() {
                return {
                    'menu-opened': this.menu_opened
                };
            }
        },

        methods: {
            toggleMenu(state = null) {
                if (typeof state !== 'boolean') {
                    state = !this.menu_opened;
                }

                this.menu_opened = state;
            }
        }
    };
</script>
