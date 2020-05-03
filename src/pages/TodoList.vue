<template>
    <div class="page page-todo-list">
        <div class="date-selector">
            <md-button class="md-icon-button" :class="prevDateClassList" @click.prevent="prevDate">
                <md-icon>chevron_left</md-icon>
            </md-button>

            <span>{{ dateLabel }}</span>

            <md-button class="md-icon-button" :class="nextDateClassList" @click.prevent="nextDate">
                <md-icon>chevron_right</md-icon>
            </md-button>
        </div>

        <h1>Чек-лист на день</h1>



        <ul class="todo-list">
            <li v-for="(item, i) in todo" :key="i">
                <md-checkbox v-model="item.checked" class="md-primary">{{ item.name }}</md-checkbox>

                <div class="time">{{ item.time || '---' }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import './assets/scss/_TodoList.scss';

    export default {
        name: 'page-todo',

        created() {
            this.load();
        },

        data() {
            let currentDate = new Date(),
                date = currentDate;

            if (this.$route.params.date) {
                let routeDate = new Date(this.$route.params.date);

                if (isNaN(routeDate.getTime()) === false) {
                    date = routeDate;
                }
            }

            return {
                currentDate: currentDate,
                currentDateLabel: this.calcDateLabel(date),
                date: date,
                todo: []
            };
        },

        computed: {
            dateLabel() {
                return this.calcDateLabel(this.date);
            },

            prevDateClassList() {
                return {};
            },

            nextDateClassList() {
                return {
                    disabled: this.calcDateLabel(this.currentDate) === this.dateLabel
                };
            }
        },

        methods: {
            load() {
                this.$api.getTodoList().then(({data}) => {
                    this.todo = data;
                });
            },

            /**
             * @param {Date} date
             * @returns {string}
             */
            calcDateLabel(date) {
                return date.toLocaleString('ru', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                });
            },

            /**
             * @param {Date} date
             * @returns {string}
             */
            calcDateIsoLabel(date) {
                return date.toISOString().split('T')[0];
            },

            prevDate() {
                let prevDate = new Date(this.date);

                prevDate.setHours(this.date.getHours() - 24);

                this.date = prevDate;

                this.updateRoute();
            },

            nextDate() {
                let nextDate = new Date(this.date);

                nextDate.setHours(this.date.getHours() + 24);

                this.date = nextDate;

                this.updateRoute();
            },

            updateRoute() {
                this.$router.replace({name: 'page-todo', params: {date: this.calcDateIsoLabel(this.date)}});
            }
        }
    };
</script>
