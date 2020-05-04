<template>
    <div class="page page-indication-list">
        <h1>Измерения</h1>

        <date-selector :date="date" @change="setDate($event)"/>

        <ul class="indication-list">
            <template v-for="(group, i) in groupedIndicationRows">
                <li :key="i">
                    <h3>
                        <img :src="group.icon" alt="" class="icon">
                        <span>{{ group.name }}</span>
                    </h3>

                    <table>
                        <colgroup>
                            <col>
                            <col width="50">
                            <col width="50">
                        </colgroup>

                        <tbody>
                        <tr v-for="(row, k) in group.rows" :key="k">
                            <td>{{ row.name }}</td>
                            <td>{{ row.value }}</td>
                            <td>{{ row.time }}</td>
                        </tr>
                        </tbody>
                    </table>
                </li>
            </template>
        </ul>

        <div class="controls">
            <router-link to="/indication-add" class="button">Добавить измерения</router-link>
        </div>
    </div>
</template>

<script>
    import DateSelector from '@/components/DateSelector.vue';

    import indicationTypes from '@/codex/indication-types.json';

    import './assets/scss/_IndicationList.scss';

    export default {
        name: 'page-indication-list',

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

        computed: {
            groupedIndicationRows() {
                let groups = [];

                indicationTypes.forEach((indicationType) => {
                    let filteredRows = this.rows.filter(({type}) => type === indicationType.type);

                    if (filteredRows.length === 0) {
                        return;
                    }

                    groups.push({
                        type: indicationType.type,
                        name: indicationType.name,
                        icon: indicationType.icon,
                        rows: filteredRows
                    });
                });

                return groups;
            }
        },

        methods: {
            load() {
                this.$api.getIndicationList().then(({data}) => {
                    this.rows = data;
                });
            },

            setDate(date) {
                this.date = date;

                this.$router.replace({
                    name: 'page-indication-list',
                    params: {date}
                });
            }
        }
    };
</script>
