<template>
    <div class="page page-disease-dynamics">
        <h1>Динамика болезни</h1>

        <ul class="navigation-buttons">
            <li v-for="(indication, i) in indications" :key="i">
                <a href="#"
                   :class="[`type-${indication.type.toLowerCase()}`, indication.type === type ? 'active' : null]"
                   @click.prevent="setType(indication.type)">
                    <img :src="indication.icon" alt="">
                </a>
            </li>
        </ul>

        <div class="graph-wrapper">
            <img :src="group.graph" class="graph" alt="">
        </div>

        <template v-if="type === 'Sleep' && sleepTaskCompleted">
            <router-link to="/quiz-norton" class="plank-link">
                <div class="icon">
                    <img src="/img/icons/light.svg" alt="">
                </div>

                <div class="label">
                    Оценка Риска Пролежней (Norton)
                    <br>
                    <span>Очень важно</span>
                </div>
            </router-link>
        </template>

        <template v-for="(item, i) in currentIndicationItems">
            <div class="indication" :key="i">
                <div class="time">{{ item.madeAt | dateTimeLabel }}</div>

                <div class="values">
                    <p v-if="item.type === 'PulsePressure'"><b>Верхнее давление:</b> {{ item.high }}</p>
                    <p v-if="item.type === 'PulsePressure'"><b>Нижнее давление:</b> {{ item.low }}</p>
                    <p v-if="item.type === 'PulsePressure'"><b>Пульс:</b> {{ item.pulse }}</p>

                    <p v-if="item.type === 'Temperature'"><b>Температура:</b> {{ item.temp }}°C</p>

                    <p v-if="item.type === 'Sleep'"><b>Начало сна:</b> {{ item.startAt | timeFromTimestamp }}</p>
                    <p v-if="item.type === 'Sleep'"><b>Окончание сна:</b> {{ item.endAt | timeFromTimestamp }}</p>
                    <p v-if="item.type === 'Sleep' && item.wokeUpAtNight">Есть жалобы на просыпания</p>
                    <p v-if="item.type === 'Sleep' && item.isBadSleep">Есть жалобы на качество сна</p>
                    <p v-if="item.type === 'Sleep' && item.isLongSleep">Много времени проводит в кровати</p>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    import checklistItemTypes from '@/codex/checklist-item-types.json';
    import indicationTypes from '@/codex/indication-types.json';

    import './assets/scss/_DiseaseDynamics.scss';

    const groups = [
        {
            type: checklistItemTypes.PULSE_PRESSURE,
            graph: `/img/disease-dynamics/${checklistItemTypes.PULSE_PRESSURE}.svg`
        },
        {
            type: checklistItemTypes.TEMPERATURE,
            graph: `/img/disease-dynamics/${checklistItemTypes.TEMPERATURE}.svg`
        },
        {
            type: checklistItemTypes.LIQUID,
            graph: `/img/disease-dynamics/${checklistItemTypes.LIQUID}.svg`
        },
        {
            type: checklistItemTypes.DEFECATION,
            graph: `/img/disease-dynamics/${checklistItemTypes.DEFECATION}.svg`
        },
        {
            type: checklistItemTypes.SLEEP,
            graph: `/img/disease-dynamics/${checklistItemTypes.SLEEP}.svg`
        },
        {
            type: checklistItemTypes.PAIN,
            graph: `/img/disease-dynamics/${checklistItemTypes.PAIN}.svg`
        }
    ];

    export default {
        name: 'page-disease-dynamics',

        created() {
            this.load();
        },

        data() {
            let groupTypes = groups.map(({type}) => type),
                routeType = this.$route.params.type,
                type = groupTypes.indexOf(routeType) >= 0 ? routeType : checklistItemTypes.PULSE_PRESSURE;

            return {
                type,
                groups,
                indicationTypes,

                checklist: null,
                indication: null
            };
        },

        computed: {
            group() {
                return this.groups.find(({type}) => this.type === type);
            },

            indications() {
                let groupTypes = groups.map(({type}) => type);

                return indicationTypes.filter((indication) => groupTypes.indexOf(indication.type) >= 0);
            },

            sleepTaskCompleted() {
                return this.checklist && this.checklist.items.filter(({type, completed}) => completed && type === checklistItemTypes.SLEEP).length > 0;
            },

            currentIndicationItems() {
                return this.indication && this.indication.items.filter(({type}) => type === this.type).sort((a, b) => {
                    let a_date = new Date(a.madeAt),
                        b_date = new Date(b.madeAt);

                    return Math.sign(b_date.getTime() - a_date.getTime());
                });
            }
        },

        methods: {
            ...mapActions([
                'getChecklist',
                'getIndicationList'
            ]),

            load() {
                this.getChecklist().then((checklist) => {
                    this.checklist = checklist;
                });

                this.getIndicationList().then((indication) => {
                    this.indication = indication;
                });
            },

            setType(type) {
                this.type = type;

                this.$router.replace({name: 'page-disease-dynamics', params: {type}});
            }
        }
    };
</script>
