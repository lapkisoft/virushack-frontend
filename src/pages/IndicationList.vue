<template>
    <div class="page page-indication-list">
        <h1>Измерения</h1>

        <div class="page-date-selector">
            <a href="#" class="prev-date" :class="prevDateClassList" @click.prevent="prevDate"></a>

            <span>{{ dateLabel }}</span>

            <a href="#" class="next-date" :class="nextDateClassList" @click.prevent="nextDate"></a>
        </div>

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
    import './assets/scss/_IndicationList.scss';

    export default {
        name: 'page-indication-list',

        created() {
            this.load();
        },

        data() {
            let currentDate = new Date(),
                date = currentDate;

            if (this.$route.params.date) {
                let routeDate = new Date(this.$route.params.date);

                if (isNaN(routeDate.getTime()) === false) {
                    date = routeDate;
                }
            }

            return {
                currentDate: currentDate,
                currentDateLabel: this.calcDateLabel(date),
                date: date,
                rows: []
            };
        },

        computed: {
            dateLabel() {
                return this.calcDateLabel(this.date);
            },

            prevDateClassList() {
                return {};
            },

            nextDateClassList() {
                return {
                    disabled: this.calcDateLabel(this.currentDate) === this.dateLabel
                };
            },

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

            /**
             * @param {Date} date
             * @returns {string}
             */
            calcDateLabel(date) {
                return date.toLocaleString('ru', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                });
            },

            /**
             * @param {Date} date
             * @returns {string}
             */
            calcDateIsoLabel(date) {
                return date.toISOString().split('T')[0];
            },

            prevDate() {
                let prevDate = new Date(this.date);

                prevDate.setHours(this.date.getHours() - 24);

                this.date = prevDate;

                this.updateRoute();
            },

            nextDate() {
                let nextDate = new Date(this.date);

                nextDate.setHours(this.date.getHours() + 24);

                this.date = nextDate;

                this.updateRoute();
            },

            updateRoute() {
                this.$router.replace({
                    name: 'page-indication-list',
                    params: {
                        date: this.calcDateIsoLabel(this.date)
                    }
                });
            }
        }
    };
</script>
