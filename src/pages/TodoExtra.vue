<template>
    <div class="page page-todo-extra" v-if="extra">
        <template v-if="extra === 'general-tonic-exercises'">
            <h1>Общетонизирующее упражнение</h1>

            <h3>Упражнение 1: Приседания</h3>

            <div class="panel">
                Из положения стоя поставьте ноги немного шире плеч. Спину держите ровно, плечи не поднимайте,
                они должны быть расслаблены и немного опущены. Для баланса держите руки перед собой. Новичкам
                рекомендуется сложить руки в замок перед собой или вытянуть прямые руки вперед, так как в этом
                положении легче всего соблюдать равновесие и идеальное положение тела при приседании. Начните
                приседать, отводя таз назад и сгибая ноги в коленях. Опускайтесь назад, словно стараясь сесть
                на невидимый стул, именно в таком положении бедра будут параллельны полу.
            </div>

            <div class="img-wrapper">
                <img src="/img/todo-extra/general-tonic-exercises/01.jpg" alt="">
            </div>

            <h3>Упражнение 2: Поднятие ног</h3>

            <div class="panel">
                Поставьте прямые руки на спинку стула, ноги вместе, не сутультесь и втяните живот. Присядьте
                примерно до параллели с полом. Выпрямляясь, перенесите вес на одну ногу, вторую поднимите в сторону,
                потянув носок на себя и направив пятку вверх. Верните ногу в исходное положение, присядьте и сделайте
                то же самое другой ногой. 1 подход – 20 повторений (по 10 каждой ногой).
            </div>

            <div class="img-wrapper">
                <img src="/img/todo-extra/general-tonic-exercises/02.jpg" alt="">
            </div>
        </template>

        <div class="controls">
            <a href="#" class="button" @click.prevent="submit">Выполнено</a>
        </div>
    </div>
</template>

<script>
    import './assets/scss/_TodoExtra.scss';

    export default {
        name: 'page-todo-extra',

        created() {
            this.item_id = this.$route.params.item_id;

            this.load();
        },

        data() {
            return {
                extra: null,

                item_id: null,
                item_type: null,
                item_description: null,
                item_date: null,
                item_time: null
            };
        },

        methods: {
            load() {
                this.$api.getCheckItemById(this.item_id).then((item) => {
                    try {
                        item.fields = JSON.parse(item.description || '{}');
                    } catch (error) {
                        item.fields = {};
                    }

                    this.extra = item.fields.extra;
                    this.type = item.type;

                    let timeParts = item.time.split(/[TZ]/);

                    this.item_type = item.type;
                    this.item_description = item.description;
                    this.item_date = timeParts[0];
                    this.item_time = timeParts[1];
                });
            },

            submit() {
                this.$api.patchCheckItem(this.item_id, this.item_type, this.item_date, this.item_time, true, this.item_description).then(() => {
                    this.$router.push({name: 'page-todo-list'});
                });
            }
        }
    };
</script>