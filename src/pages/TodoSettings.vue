<template>
    <div class="page page-todo-settings">
        <h1>Настройки чек-листа</h1>

        <ul class="todo-settings">
            <li v-for="(row, i) in rows" :key="i">
                <h3>Задача #{{ i + 1 }}</h3>

                <div class="form-group">
                    <select v-model="row.type" class="form-control">
                        <option value="">Выберите задачу</option>
                        <option value="temperature">Замерить давление и пульс</option>
                        <option value="pressure">Замерить температуру</option>
                        <option value="text-1">Дыхательная гимнастика</option>
                        <option value="text-2">Общетонизирующие упражнения</option>
                    </select>
                </div>

                <div class="form-group">
                    <select v-model="row.regularity" class="form-control">
                        <option value="">Выберите регулярность</option>
                        <option value="1-time-at-2-days">Раз в 2 дня</option>
                        <option value="1-time-at-1-day">Ежедневно</option>
                        <option value="2-times-at-1-day">2 раза в день</option>
                        <option value="3-times-at-1-day">3 раза в день</option>
                    </select>
                </div>

                <div class="form-group">
                    <select v-model="row.time" class="form-control">
                        <option value="">Выберите время</option>

                        <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(row.regularity) >= 0" value="06:00">06:00</option>
                        <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(row.regularity) >= 0" value="08:00">08:00</option>
                        <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(row.regularity) >= 0" value="10:00">10:00</option>
                        <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(row.regularity) >= 0" value="12:00">12:00</option>
                        <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(row.regularity) >= 0" value="14:00">14:00</option>
                        <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(row.regularity) >= 0" value="16:00">16:00</option>
                        <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(row.regularity) >= 0" value="18:00">18:00</option>
                        <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(row.regularity) >= 0" value="20:00">20:00</option>
                        <option v-if="['2-times-at-1-day'].indexOf(row.regularity) >= 0" value="08:00, 12:00">08:00, 12:00</option>
                        <option v-if="['2-times-at-1-day'].indexOf(row.regularity) >= 0" value="08:00, 16:00">08:00, 16:00</option>
                        <option v-if="['2-times-at-1-day'].indexOf(row.regularity) >= 0" value="08:00, 20:00">08:00, 20:00</option>
                        <option v-if="['2-times-at-1-day'].indexOf(row.regularity) >= 0" value="12:00, 16:00">12:00, 16:00</option>
                        <option v-if="['2-times-at-1-day'].indexOf(row.regularity) >= 0" value="12:00, 20:00">12:00, 20:00</option>
                        <option v-if="['2-times-at-1-day'].indexOf(row.regularity) >= 0" value="16:00, 20:00">16:00, 20:00</option>
                    </select>
                </div>
            </li>
        </ul>

        <div class="controls">
            <router-link to="/todo-form" class="btn btn-block btn-lg btn-primary">+ Добавить задачу</router-link>
        </div>
    </div>
</template>

<script>
    import './assets/scss/_TodoSettings.scss';

    export default {
        name: 'todo-settings',

        created() {
            this.load();
        },

        data() {
            return {
                rows: []
            };
        },

        methods: {
            load() {
                this.$api.getTodoSettings().then(({data}) => {
                    this.rows = data;
                });
            }
        }
    };
</script>