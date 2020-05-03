<template>
    <div class="page page-todo-list">
        <h1>Чек-лист на день</h1>

        <div class="page-date-selector">
            <a href="#" class="prev-date" :class="prevDateClassList" @click.prevent="prevDate"></a>

            <span>{{ dateLabel }}</span>

            <a href="#" class="next-date" :class="nextDateClassList" @click.prevent="nextDate"></a>
        </div>

        <ul class="todo-list">
            <li v-for="(row, i) in rows" :key="i">
                <input :id="`todo-item-${i}-input`"
                       :checked="row.checked"
                       type="checkbox">

                <label :for="`todo-item-${i}-input`">
                    <div class="checkbox"></div>
                    <div class="name">{{ row.name }}</div>
                    <div class="time">{{ row.time || '---' }}</div>
                </label>
            </li>
        </ul>

        <div class="controls">
            <router-link to="/todo-settings" class="btn btn-block btn-lg btn-primary">Настроить</router-link>
        </div>
    </div>
</template>

<script>
    import './assets/scss/_TodoList.scss';

    export default {
        name: 'page-todo-list',

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
                rows: []
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
                    this.rows = data;
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
                this.$router.replace({
                    name: 'page-todo-list',
                    params: {
                        date: this.calcDateIsoLabel(this.date)
                    }
                });
            }
        }
    };
</script>
