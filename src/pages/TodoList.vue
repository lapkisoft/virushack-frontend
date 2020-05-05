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
           style="position: fixed; left: 15px; bottom: 15px; width: 55px; height: 55px; padding: 17px; border-radius: 30px; 2px 9px 30px rgba(170, 187, 201, 0.795345), -8px 5px 12px rgba(244, 248, 251, 0.345662), -13px -7px 15px rgba(246, 251, 255, 0.741505), -7px -7px 12px rgba(255, 255, 255, 0.0155704)"
           class="button"
           @click.prevent="refresh">
            <i class="fa fa-refresh"></i>
        </a>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';

    import DateSelector from '@/components/DateSelector.vue';

    import checklistItemTypes from '@/codex/checklist-item-types.json';

    import './assets/scss/_TodoList.scss';
    import IndicationForm from './IndicationForm.vue';
    import TodoExtra from './TodoExtra.vue';

    export default {
        name: 'page-todo-list',

        beforeRouteEnter(to, from, next) {
            window.scrollTo(0, 0);

            next();
        },

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
                rows: []
            };
        },

        computed: {
            ...mapState([
                'defaultItems'
            ])
        },

        methods: {
            ...mapActions([
                'getChecklist',
                'getIndicationList'
            ]),

            load() {
                this.getChecklist(this.date).then((checklist) => {
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
                        item.extra = item.fields.extra;

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

                promises.push(this.getChecklist(this.date));
                promises.push(this.getIndicationList(this.date));

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

            checkboxItemAction(item) {
                if (item.completed) {
                    return;
                }

                switch (item.type) {
                    case checklistItemTypes.PULSE_PRESSURE:
                    case checklistItemTypes.TEMPERATURE:
                    case checklistItemTypes.SLEEP:
                        this.$router.push({name: IndicationForm.nameForItem, params: {item_id: item.id}});

                        break;

                    case checklistItemTypes.CUSTOM:
                        if (item.extra) {
                            this.$router.push({name: TodoExtra.name, params: {item_id: item.id}});
                        } else {
                            let timeParts = item.time.split(/[TZ]/),
                                date = timeParts[0],
                                time = timeParts[1];

                            this.$api.patchCheckItem(item.id, item.type, date, time, true, item.description).then(() => {
                                this.load();
                            });
                        }

                        break;

                    default:
                        console.log('Unexpected type', item.type);
                }
            }
        }
    };
</script>
