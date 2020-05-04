<template>
    <div class="page page-todo-list">
        <h1>Чек-лист на день</h1>

        <div class="page-date-selector">
            <a href="#"
               class="prev-date"
               :class="prevDateClassList"
               @click.prevent="toPrevDate">{{ prevDateLabel }}</a>

            <span>{{ dateLabel }}</span>

            <a href="#"
               class="next-date"
               :class="nextDateClassList"
               @click.prevent="toNextDate">{{ nextDateLabel }}</a>
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
                currentDateIsoLabel: this.calcDateIsoLabel(date),
                date: date,
                rows: []
            };
        },

        computed: {
            dateLabel() {
                return this.calcDateLabel(this.date);
            },

            dateIsoLabel() {
                return this.calcDateIsoLabel(this.date);
            },

            prevDate() {
                let prevDate = new Date(this.date);

                prevDate.setHours(this.date.getHours() - 24);

                return prevDate;
            },

            prevDateLabel() {
                return this.calcDateLabel(this.prevDate);
            },

            prevDateClassList() {
                return {};
            },

            nextDate() {
                let nextDate = new Date(this.date);

                nextDate.setHours(this.date.getHours() + 24);

                return nextDate;
            },

            nextDateLabel() {
                return this.calcDateLabel(this.nextDate);
            },

            nextDateClassList() {
                return {
                    disabled: this.currentDateIsoLabel === this.dateIsoLabel
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
                return date.toLocaleDateString('ru', {
                    month: 'short',
                    day: 'numeric'
                });
            },

            /**
             * @param {Date} date
             * @returns {string}
             */
            calcDateIsoLabel(date) {
                return date.toISOString().split('T')[0];
            },

            toPrevDate() {
                this.date = this.prevDate;

                this.updateRoute();
            },

            toNextDate() {
                this.date = this.nextDate;

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
