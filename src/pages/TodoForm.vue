<template>
    <div class="page page-todo-form">
        <h1>Добавить задачу</h1>

        <form action="">
            <h3>Новая задача</h3>

            <div class="form-group">
                <select v-model="type" class="form-control" required>
                    <option value="">Выберите задачу</option>
                    <option value="temperature">Замерить давление и пульс</option>
                    <option value="pressure">Замерить температуру</option>
                    <option value="text-1">Дыхательная гимнастика</option>
                    <option value="text-2">Общетонизирующие упражнения</option>
                    <option value="new">Новый тип задачи</option>
                </select>
            </div>

            <div class="form-group">
                <input v-model="name"
                       type="text"
                       class="form-control"
                       placeholder="Название нового типа задачи"
                       :required="type === 'new'"
                       :disabled="type !== 'new'">
            </div>

            <div class="form-group">
                <select v-model="regularity" class="form-control" required>
                    <option value="">Выберите регулярность</option>
                    <option value="1-time-at-2-days">Раз в 2 дня</option>
                    <option value="1-time-at-1-day">Ежедневно</option>
                    <option value="2-times-at-1-day">2 раза в день</option>
                    <option value="3-times-at-1-day">3 раза в день</option>
                </select>
            </div>

            <div class="form-group">
                <select v-model="time" class="form-control" required>
                    <option value="">Выберите время</option>

                    <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(regularity) >= 0" value="06:00">06:00</option>
                    <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(regularity) >= 0" value="08:00">08:00</option>
                    <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(regularity) >= 0" value="10:00">10:00</option>
                    <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(regularity) >= 0" value="12:00">12:00</option>
                    <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(regularity) >= 0" value="14:00">14:00</option>
                    <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(regularity) >= 0" value="16:00">16:00</option>
                    <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(regularity) >= 0" value="18:00">18:00</option>
                    <option v-if="['1-time-at-1-day', '1-time-at-2-days'].indexOf(regularity) >= 0" value="20:00">20:00</option>
                    <option v-if="['2-times-at-1-day'].indexOf(regularity) >= 0" value="08:00, 12:00">08:00, 12:00</option>
                    <option v-if="['2-times-at-1-day'].indexOf(regularity) >= 0" value="08:00, 16:00">08:00, 16:00</option>
                    <option v-if="['2-times-at-1-day'].indexOf(regularity) >= 0" value="08:00, 20:00">08:00, 20:00</option>
                    <option v-if="['2-times-at-1-day'].indexOf(regularity) >= 0" value="12:00, 16:00">12:00, 16:00</option>
                    <option v-if="['2-times-at-1-day'].indexOf(regularity) >= 0" value="12:00, 20:00">12:00, 20:00</option>
                    <option v-if="['2-times-at-1-day'].indexOf(regularity) >= 0" value="16:00, 20:00">16:00, 20:00</option>
                </select>
            </div>

            <div class="controls">
                <button type="submit" class="btn btn-block btn-lg btn-primary">Сохранить</button>
            </div>
        </form>
    </div>
</template>

<script>
    import './assets/scss/_TodoForm.scss';

    export default {
        name: 'page-todo-form',

        data() {
            return {
                type: '',
                name: '',
                regularity: '',
                time: ''
            };
        }
    };
</script>
