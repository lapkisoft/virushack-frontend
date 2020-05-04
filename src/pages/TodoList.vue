<template>
    <div class="page page-todo-list">
        <h1>Чек-лист на день</h1>

        <date-selector :date="date" @change="setDate($event)"/>

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
    import DateSelector from '@/components/DateSelector.vue';

    import './assets/scss/_TodoList.scss';

    export default {
        name: 'page-todo-list',

        components: {
            DateSelector
        },

        created() {
            this.load();
        },

        data() {
            return {
                date: this.$route.params.date,
                rows: []
            };
        },

        methods: {
            load() {
                this.$api.getTodoList().then(({data}) => {
                    this.rows = data;
                });
            },

            setDate(date) {
                this.date = date;

                this.$router.replace({
                    name: 'page-todo-list',
                    params: {date}
                });
            }
        }
    };
</script>
