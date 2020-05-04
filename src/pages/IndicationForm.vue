<template>
    <div class="page page-indication-form">
        <h1>{{ name }}</h1>

        <form action="">
            <template v-if="type === 'pressure'">
                <h3>Давление</h3>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="pressure_high"
                           placeholder="Верхнее"
                           required>
                </div>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="pressure_low"
                           placeholder="Нижнее"
                           required>
                </div>

                <h3>Пульс</h3>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="pressure_pulse"
                           placeholder="Укажите пульс"
                           required>
                </div>
            </template>

            <template v-else-if="type === 'temperature'">
                <h3>Измерьте температуру</h3>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="temperature_value"
                           placeholder="36.6"
                           required>
                </div>
            </template>

            <template v-else-if="type === 'toilet'">
                <h3>Опишите стул</h3>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="toilet_color"
                           placeholder="Цвет"
                           required>
                </div>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="toilet_form"
                           placeholder="Форма"
                           required>
                </div>
            </template>

            <template v-else-if="type === 'sleep'">
                <h3>Примерное время сна</h3>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="sleep_hours"
                           placeholder="7"
                           required>
                </div>
            </template>

            <template v-else-if="type === 'pain'">
                <h3>Оцените болевые ощущения</h3>

                <div class="form-group">
                    <select class="form-control" v-model="pain_value" required>
                        <option value="">Выберите значение</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </template>

            <template v-else-if="type === 'skin'">
                <h3>Кожный покров</h3>
            </template>

            <template v-else-if="type === 'liquid'">
                <h3>Выпито жидкости</h3>

                <div class="form-group">
                    <select class="form-control" v-model="liquid_type" required>
                        <option value="">Укажите выпитую жидкость</option>
                        <option value="water">Вода</option>
                        <option value="milk">Молоко</option>
                        <option value="juice">Сок</option>
                        <option value="tea">Чай</option>
                        <option value="coffee">Кофе</option>
                        <option value="another">Прочее</option>
                    </select>
                </div>

                <div class="from-group">
                    <input type="text"
                           class="form-control"
                           v-model="liquid_in"
                           placeholder="Укажите количество, мл"
                           required>
                </div>

                <br>
                <br>

                <h3>Выделено жидкости</h3>

                <div class="from-group">
                    <input type="text"
                           class="form-control"
                           v-model="liquid_out"
                           placeholder="Укажите количество, мл"
                           required>
                </div>
            </template>

            <div class="controls">
                <button type="submit" class="button">Сохранить</button>
            </div>
        </form>
    </div>
</template>

<script>
    import indicationTypes from '@/codex/indication-types.json';

    import './assets/scss/_IndicationForm.scss';

    export default {
        name: 'page-indication-form',

        created() {
            this.type = this.$route.params.type;
        },

        data() {
            return {
                type: null,
                pressure_low: '',
                pressure_high: '',
                pressure_pulse: '',
                temperature_value: '',
                liquid_type: '',
                liquid_in: '',
                liquid_out: '',
                toilet_color: '',
                toilet_form: '',
                sleep_hours: '',
                pain_value: ''
            };
        },

        computed: {
            name() {
                let type = indicationTypes.find(({type}) => type === this.type);

                if (!type) {
                    return 'Форма добавления';
                }

                return type.name;
            }
        }
    };
</script>