<template>
    <div id="app">
        <header>
            <md-toolbar class="md-primary">
                <div class="md-toolbar-row">
                    <div class="md-toolbar-section-start">
                        <md-button class="md-icon-button" @click.prevent="toggleMenu">
                            <md-icon>menu</md-icon>
                        </md-button>
                    </div>

                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button" to="/settings" @click.native="toggleMenu(false)">
                            <md-icon>settings</md-icon>
                        </md-button>
                    </div>
                </div>
            </md-toolbar>
        </header>

        <md-drawer :md-active.sync="showMenu" md-swipeable>
            <md-toolbar class="md-transparent" md-elevation="0">
                <span class="md-title">Забота о близких</span>
            </md-toolbar>

            <md-list>
                <md-list-item @click="toggleMenu(false)" to="/todo-list">
                    <md-icon>today</md-icon>
                    <span class="md-list-item-text">Чек-лист на сегодня</span>
                </md-list-item>

                <md-list-item @click="toggleMenu(false)" to="/indications">
                    <md-icon>opacity</md-icon>
                    <span class="md-list-item-text">Измерения</span>
                </md-list-item>

                <md-list-item @click="toggleMenu(false)" to="/quiz">
                    <md-icon>library_add_check</md-icon>
                    <span class="md-list-item-text">Опрос состояния больного</span>
                </md-list-item>

                <md-list-item @click="toggleMenu(false)" to="/recommendations">
                    <md-icon>bookmarks</md-icon>
                    <span class="md-list-item-text">Рекомендации</span>
                </md-list-item>

                <md-list-item @click="toggleMenu(false)" to="/settings">
                    <md-icon>settings</md-icon>
                    <span class="md-list-item-text">Настройка</span>
                </md-list-item>
            </md-list>
        </md-drawer>

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
                showMenu: false
            };
        },

        computed: {},

        methods: {
            toggleMenu(state = null) {
                if (typeof state !== 'boolean') {
                    state = !this.showMenu;
                }

                this.showMenu = state;
            }
        }
    };
</script>