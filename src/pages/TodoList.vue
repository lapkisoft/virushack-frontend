<template>
    <div class="page page-todo-list">
        <h1>Чек-лист на день</h1>

        <date-selector :date="date" @change="setDate($event)"/>

        <ul class="todo-list">
            <li v-for="(row, i) in rows" :key="i">
                <input :id="`todo-item-${i}-input`"
                       :checked="row.completed"
                       type="checkbox">

                <label :for="`todo-item-${i}-input`" @click.prevent="checkboxItemAction(row)">
                    <div class="checkbox"></div>
                    <div class="name">{{ row.label }}</div>
                    <div class="time">{{ row.time | timeFromTimestamp }}</div>
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
                        time: '11:00',
                        description: JSON.stringify({
                            label: 'Замерить температуру'
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
                this.getChecklist().then(checklist => {
                    let promises = [];

                    for (let item of checklist.items) {
                        promises.push(this.$api.deleteCheckItem(item.id));
                    }

                    for (let {type, time, description} of this.defaultItems) {
                        promises.push(this.$api.postCheckItem(type, this.date, time, description));
                    }

                    Promise.all(promises).finally(() => {
                        this.load();
                    });
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

            checkboxItemAction(item) {
                switch (item.type) {
                    case checklistItemTypes.PULSE_PRESSURE:
                    case checklistItemTypes.TEMPERATURE:
                        this.$router.push({name: IndicationForm.nameForItem, params: {item_id: item.id}});

                        break;

                    default:
                        console.log('Unexpected type', item.type);
                }
            }
        }
    };
</script>
