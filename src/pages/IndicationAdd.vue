<template>
    <div class="page page-indication-add">
        <h1>Что будем мерить?</h1>

        <ul class="indication-add">
            <li v-for="(indicationType, i) in types" :key="i">
                <router-link
                        class="button"
                        :class="[`type-${indicationType.type.toLowerCase()}`]"
                        :to="{name: 'page-indication-form-for-type', params: {type: indicationType.type}}">
                    <div class="icon">
                        <img :src="indicationType.icon" alt="">
                    </div>

                    <div class="label">{{ indicationType.name }}</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import indicationTypes from '@/codex/indication-types.json';

    import './assets/scss/_IndicationAdd.scss';

    export default {
        name: 'page-indication-add',

        beforeRouteEnter(to, from, next) {
            window.scrollTo(0, 0);

            next();
        },

        computed: {
            types() {
                return indicationTypes;
            }
        }
    };
</script>