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
            <a href="#" class="btn btn-block btn-lg btn-primary">Добавить измерения</a>
        </div>
    </div>
</template>

<script>
    import DateSelector from '@/components/DateSelector.vue';

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
                return [
                    {
                        type: 'pressure',
                        name: 'Давление',
                        icon: '/img/icons/indication-pressure.svg',
                        rows: this.rows.filter(({type}) => type === 'pressure')
                    },
                    {
                        type: 'temperature',
                        name: 'Температура',
                        icon: '/img/icons/indication-temperature.svg',
                        rows: this.rows.filter(({type}) => type === 'temperature')
                    },
                    {
                        type: 'liquid',
                        name: 'Жидкость',
                        icon: '/img/icons/indication-liquid.svg',
                        rows: this.rows.filter(({type}) => type === 'liquid')
                    },
                    {
                        type: 'toilet',
                        name: 'Туалет',
                        icon: '/img/icons/indication-toilet.svg',
                        rows: this.rows.filter(({type}) => type === 'toilet')
                    },
                    {
                        type: 'sleep',
                        name: 'Сон',
                        icon: '/img/icons/indication-sleep.svg',
                        rows: this.rows.filter(({type}) => type === 'sleep')
                    },
                    {
                        type: 'pain',
                        name: 'Боль',
                        icon: '/img/icons/indication-pain.svg',
                        rows: this.rows.filter(({type}) => type === 'pain')
                    },
                    {
                        type: 'skin',
                        name: 'Повреждения кожи',
                        icon: '/img/icons/indication-skin.svg',
                        rows: this.rows.filter(({type}) => type === 'skin')
                    },
                    {
                        type: 'walk',
                        name: 'Прогулка',
                        icon: '/img/icons/indication-walk.svg',
                        rows: this.rows.filter(({type}) => type === 'walk')
                    },
                    {
                        type: 'dosug',
                        name: 'Досуг',
                        icon: '/img/icons/indication-dosug.svg',
                        rows: this.rows.filter(({type}) => type === 'dosug')
                    }
                ].filter(({rows}) => rows.length > 0);
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
