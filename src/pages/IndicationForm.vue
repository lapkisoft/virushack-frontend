<template>
    <div class="page page-indication-form" v-if="type">
        <h1>{{ name }}</h1>

        <form action="" @submit.prevent="submit">
            <template v-if="type === checklistItemTypes.PULSE_PRESSURE">
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

            <template v-else-if="type === checklistItemTypes.TEMPERATURE">
                <h3>Измерьте температуру</h3>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="temperature_value"
                           placeholder="36.6"
                           required>
                </div>
            </template>

            <template v-else-if="type === checklistItemTypes.DEFECATION">
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

            <template v-else-if="type === checklistItemTypes.SLEEP">
                <h3>Начало сна</h3>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="sleep_start_at"
                           placeholder="22:00"
                           required>
                </div>

                <h3>Окончание сна</h3>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="sleep_end_at"
                           placeholder="08:00"
                           required>
                </div>

                <ul class="checkbox-list">
                    <li>
                        <input id="sleep-woke-up-at-night-input" type="checkbox" v-model="sleep_woke_up_at_night">

                        <label for="sleep-woke-up-at-night-input">
                            <div class="checkbox"></div>
                            <div class="name">За ночь просыпался</div>
                        </label>
                    </li>

                    <li>
                        <input id="sleep-is-bad-sleep-input" type="checkbox" v-model="sleep_is_bad_sleep">

                        <label for="sleep-is-bad-sleep-input">
                            <div class="checkbox"></div>
                            <div class="name">Есть жалобы на качество сна</div>
                        </label>
                    </li>

                    <li>
                        <input id="sleep-is-long-sleep-input" type="checkbox" v-model="sleep_is_long_sleep">

                        <label for="sleep-is-long-sleep-input">
                            <div class="checkbox"></div>
                            <div class="name">Провёл много времени в кровати</div>
                        </label>
                    </li>
                </ul>
            </template>

            <template v-else-if="type === checklistItemTypes.PAIN">
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

            <template v-else-if="type === checklistItemTypes.SKIN_DAMAGE">
                <h3>Кожный покров</h3>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="skin_color"
                           placeholder="Цвет кожи"
                           required>
                </div>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="skin_dryness"
                           placeholder="Сухость"
                           required>
                </div>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="skin_damage"
                           placeholder="Язвы, повреждения"
                           required>
                </div>
            </template>

            <template v-else-if="type === checklistItemTypes.WALK">
                <h3>Длительность прогулки</h3>

                <div class="form-group">
                    <select class="form-control" v-model="pain_value" required>
                        <option value="">Выберите значение</option>
                        <option value="00:00">Без прогулки</option>
                        <option value="15:00">15 минут</option>
                        <option value="30:00">30 минут</option>
                        <option value="45:00">45 минут</option>
                        <option value="60:00">1 час</option>
                        <option value="90:00">1 час 30 минут</option>
                    </select>
                </div>
            </template>

            <template v-else-if="type === checklistItemTypes.DOSUG">
                <h3>Опишите досуг подопечного</h3>

                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="dosug_type"
                           placeholder="Телевизор, музыка, чтение"
                           required>
                </div>

                <div class="form-group">
                    <select class="form-control" v-model="dosug_duration" required>
                        <option value="">Выберите длительность</option>
                        <option value="15:00">15 минут</option>
                        <option value="30:00">30 минут</option>
                        <option value="45:00">45 минут</option>
                        <option value="60:00">1 час</option>
                        <option value="90:00">1 час 30 минут</option>
                        <option value="120:00">2 часа</option>
                    </select>
                </div>
            </template>

            <template v-else-if="type === checklistItemTypes.LIQUID">
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
    import checklistItemTypes from '@/codex/checklist-item-types.json';

    import './assets/scss/_IndicationForm.scss';

    const nameForType = 'page-indication-form-for-type';
    const nameForItem = 'page-indication-form-for-item';

    export default {
        nameForType,
        nameForItem,

        created() {
            switch (this.$route.name) {
                case nameForType:
                    this.type = this.$route.params.type;

                    break;

                case nameForItem:
                    this.item_id = this.$route.params.item_id;

                    this.loadTypeByItemId();

                    break;
            }

            this.load();
        },

        data() {
            return {
                checklistItemTypes,

                date: new Date().toISOString().split('T')[0],

                type: null,

                item_id: null,
                item_type: null,
                item_description: null,
                item_date: null,
                item_time: null,

                indication_list_id: null,

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
                sleep_start_at: '',
                sleep_end_at: '',
                sleep_woke_up_at_night: false,
                sleep_is_bad_sleep: false,
                sleep_is_long_sleep: false,
                pain_value: '',
                skin_color: '',
                skin_dryness: '',
                skin_damage: '',
                dosug_type: '',
                dosug_duration: ''
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
        },

        methods: {
            load() {
                this.getIndicationList().then((indicationList) => {
                    this.indication_list_id = indicationList.id;
                });
            },

            submit() {
                switch (this.type) {
                    case checklistItemTypes.PULSE_PRESSURE:
                        this.$api.postIndicationPulsePressure(this.date, this.pressure_low, this.pressure_high, this.pressure_pulse).then(() => {
                            this.afterSubmit();
                        });

                        break;

                    case checklistItemTypes.TEMPERATURE:
                        this.$api.postIndicationTemperature(this.date, this.temperature_value).then(() => {
                            this.afterSubmit();
                        });

                        break;

                    case checklistItemTypes.SLEEP:
                        this.$api.postIndicationSleep(
                            this.date,
                            this.sleep_start_at,
                            this.sleep_end_at,
                            this.sleep_woke_up_at_night,
                            this.sleep_is_bad_sleep,
                            this.sleep_is_long_sleep
                        ).then(() => {
                            this.afterSubmit();
                        });

                        break;

                    default:
                        console.log('Unknown type!', this.type);
                }
            },

            afterSubmit() {
                switch (this.$route.name) {
                    case nameForType:
                        this.$router.push({name: 'page-disease-dynamics', params: {type: this.type}});
                        break;

                    case nameForItem:
                        this.$api.patchCheckItem(this.item_id, this.item_type, this.item_date, this.item_time, true, this.item_description).then(() => {
                            this.$router.push({name: 'page-todo-list'});
                        });

                        break;
                }
            },

            getIndicationList() {
                return new Promise((resolve, reject) => {
                    this.$api.getIndicationList(this.date).then(resolve, () => {
                        this.$api.postIndicationList(this.date).then(resolve, reject);
                    });
                });
            },

            loadTypeByItemId() {
                if (!this.item_id) {
                    return;
                }

                this.$api.getCheckItemById(this.item_id).then((item) => {
                    this.type = item.type;

                    let timeParts = item.time.split(/[TZ]/);

                    this.item_type = item.type;
                    this.item_description = item.description;
                    this.item_date = timeParts[0];
                    this.item_time = timeParts[1];
                });
            }
        }
    };
</script>