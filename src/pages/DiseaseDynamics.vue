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
    </div>
</template>

<script>
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

        },

        data() {
            let groupTypes = groups.map(({type}) => type),
                routeType = this.$route.params.type,
                type = groupTypes.indexOf(routeType) >= 0 ? routeType : checklistItemTypes.PULSE_PRESSURE;

            return {
                type,
                groups,
                indicationTypes
            };
        },

        computed: {
            group() {
                return this.groups.find(({type}) => this.type === type);
            },

            indications() {
                let groupTypes = groups.map(({type}) => type);

                return indicationTypes.filter((indication) => groupTypes.indexOf(indication.type) >= 0);
            }
        },

        methods: {
            setType(type) {
                this.type = type;

                this.$router.replace({name: 'page-disease-dynamics', params: {type}});
            }
        }
    };
</script>
