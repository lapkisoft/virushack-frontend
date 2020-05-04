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
                           placeholder="Верхнее">
                </div>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="pressure_low"
                           placeholder="Нижнее">
                </div>

                <h3>Пульс</h3>

                <div class="form-group">
                    <input type="text" class="form-control" v-model="pressure_pulse" placeholder="Укажите пульс">
                </div>
            </template>

            <template v-else-if="type === 'temperature'">
                <h3>Измерьте температуру</h3>

                <div class="form-group">
                    <input type="text" class="form-control" v-model="value" placeholder="36.6">
                </div>
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
                    <input type="text" class="form-control" v-model="liquid_in_value" placeholder="Укажите количество, мл">
                </div>

                <br>
                <br>

                <h3>Выделено жидкости</h3>

                <div class="from-group">
                    <input type="text" class="form-control" v-model="liquid_out_value" placeholder="Укажите количество, мл">
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
                liquid_type: '',
                liquid_in_value: '',
                liquid_out_value: ''
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