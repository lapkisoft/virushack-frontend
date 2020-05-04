<template>
    <div class="page page-todo-list">
        <h1>Задачи на день</h1>

        <date-selector :date="date" @change="setDate($event)"/>

        <ul class="checkbox-list">
            <li v-for="(row, i) in rows" :key="i">
                <input :id="`todo-item-${i}-input`"
                       :checked="row.completed"
                       type="checkbox">

                <label :for="`todo-item-${i}-input`" @click.prevent="checkboxItemAction(row)">
                    <div class="checkbox"></div>
                    <div class="name">{{ row.label }}</div>
                </label>
            </li>
        </ul>

        <div class="controls">
            <router-link to="/todo-settings" class="button">Настроить</router-link>
        </div>

        <a href="#"
           style="position: fixed; left: 15px; bottom: 15px; width: 60px; height: 60px; background-color: #face8d; border-radius: 30px;"
           class="button"
           @click.prevent="refresh">
            <i class="fa fa-refresh"></i>
        </a>
    </div>
</template>

<script>
    import DateSelector from '@/components/DateSelector.vue';

    import checklistItemTypes from '@/codex/checklist-item-types.json';

    import './assets/scss/_TodoList.scss';
    import IndicationForm from '@/pages/IndicationForm';

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
                checklistItemTypes,

                date: this.$route.params.date || new Date().toISOString().split('T')[0],
                rows: [],
                defaultItems: [
                    {
                        type: checklistItemTypes.PULSE_PRESSURE,
                        time: '10:00',
                        description: JSON.stringify({
                            label: 'Замерить давление и пульс'
                        })
                    },
                    {
                        type: checklistItemTypes.TEMPERATURE,
                        time: '10:10',
                        description: JSON.stringify({
                            label: 'Замерить температуру'
                        })
                    },
                    {
                        type: checklistItemTypes.SLEEP,
                        time: '10:20',
                        description: JSON.stringify({
                            label: 'Указать количество сна больного'
                        })
                    },
                    {
                        type: checklistItemTypes.CUSTOM,
                        time: '12:00',
                        description: JSON.stringify({
                            label: 'Дыхательная гимнастика'
                        })
                    },
                    {
                        type: checklistItemTypes.CUSTOM,
                        time: '12:00',
                        description: JSON.stringify({
                            label: 'Общетонизирующие упражнения'
                        })
                    },
                    {
                        type: checklistItemTypes.CUSTOM,
                        time: '16:00',
                        description: JSON.stringify({
                            label: 'Процедура 1'
                        })
                    },
                    {
                        type: checklistItemTypes.CUSTOM,
                        time: '18:00',
                        description: JSON.stringify({
                            label: 'Процедура 2'
                        })
                    }
                ]
            };
        },

        methods: {
            load() {
                this.getChecklist().then((checklist) => {
                    let items = checklist.items;

                    items = items.sort((a, b) => {
                        let a_date = new Date(a.time),
                            b_date = new Date(b.time);

                        return Math.sign(a_date.getTime() - b_date.getTime());
                    });

                    items = items.map((item) => {
                        try {
                            item.fields = JSON.parse(item.description || '{}');
                        } catch (error) {
                            item.fields = {};
                        }

                        item.label = item.fields.label;

                        return item;
                    });

                    this.rows = items;
                });
            },

            setDate(date) {
                this.date = date;

                this.load();

                this.$router.replace({
                    name: 'page-todo-list',
                    params: {date}
                });
            },

            refresh() {
                let promises = [];

                promises.push(this.getChecklist());
                promises.push(this.getIndicationList());

                Promise.all(promises).then(([checkList, indicationList]) => {
                    let deletion = [];

                    for (let item of checkList.items) {
                        deletion.push(this.$api.deleteCheckItem(item.id));
                    }

                    for (let {id, type} of indicationList.items) {
                        deletion.push(this.getDeleteIndicationPromise(id, type));
                    }

                    Promise.all(deletion).finally(() => {
                        let creation = [];

                        for (let {type, time, description} of this.defaultItems) {
                            creation.push(this.$api.postCheckItem(type, this.date, time, description));
                        }

                        Promise.all(creation).finally(() => {
                            this.load();
                        });
                    });
                });
            },

            getDeleteIndicationPromise(id, type) {
                return new Promise((resolve, reject) => {
                    switch (type) {
                        case checklistItemTypes.PULSE_PRESSURE:
                            this.$api.deleteIndicationPulsePressure(id).then(resolve, reject);

                            break;

                        case checklistItemTypes.TEMPERATURE:
                            this.$api.deleteIndicationTemperature(id).then(resolve, reject);

                            break;

                        case checklistItemTypes.SLEEP:
                            this.$api.deleteIndicationSleep(id).then(resolve, reject);

                            break;

                        default:
                            resolve();
                    }
                });
            },

            getChecklist() {
                return new Promise((resolve, reject) => {
                    this.$api.getCheckList(this.date).then(resolve, () => {
                        this.$api.postCheckList(this.date).then(() => {
                            let promises = [];

                            for (let {type, time, description} of this.defaultItems) {
                                promises.push(this.$api.postCheckItem(type, this.date, time, description));
                            }

                            Promise.all(promises).then(() => {
                                this.$api.getCheckList(this.date).then(resolve, reject);
                            });
                        }, reject);
                    });
                });
            },

            getIndicationList() {
                return new Promise((resolve, reject) => {
                    this.$api.getIndicationList(this.date).then(resolve, () => {
                        this.$api.postIndicationList(this.date).then(resolve, reject);
                    });
                });
            },

            checkboxItemAction(item) {
                switch (item.type) {
                    case checklistItemTypes.PULSE_PRESSURE:
                    case checklistItemTypes.TEMPERATURE:
                    case checklistItemTypes.SLEEP:
                        this.$router.push({name: IndicationForm.nameForItem, params: {item_id: item.id}});

                        break;

                    default:
                        console.log('Unexpected type', item.type);
                }
            }
        }
    };
</script>
