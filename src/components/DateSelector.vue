<template>
    <div class="date-selector">
        <a href="#"
           class="prev"
           :class="prevClassList"
           @click.prevent="$emit('change', calcDateIsoLabel(prev))">{{ prevLabel }}</a>

        <span>{{ dateLabel }}</span>

        <a href="#"
           class="next"
           :class="nextClassList"
           @click.prevent="$emit('change', calcDateIsoLabel(next))">{{ nextLabel }}</a>
    </div>
</template>

<script>
    import './assets/scss/_DateSelector.scss';

    export default {
        props: {
            date: {
                type: String,
                required: false
            }
        },

        data() {
            let date = new Date();

            return {
                now: date,
                nowIsoLabel: this.calcDateIsoLabel(date)
            };
        },

        computed: {
            dateObject() {
                let regex = /^\d{4}-\d{2}-\d{2}$/;

                return regex.test(`${this.date}`) ? new Date(this.date) : new Date();
            },

            dateLabel() {
                return this.calcDateLabel(this.dateObject);
            },

            dateIsoLabel() {
                return this.calcDateIsoLabel(this.dateObject);
            },

            prev() {
                let date = new Date(this.dateObject);

                date.setHours(this.dateObject.getHours() - 24);

                return date;
            },

            prevLabel() {
                return this.calcDateLabel(this.prev);
            },

            prevClassList() {
                return {};
            },

            next() {
                let date = new Date(this.dateObject);

                date.setHours(this.dateObject.getHours() + 24);

                return date;
            },

            nextLabel() {
                return this.calcDateLabel(this.next);
            },

            nextClassList() {
                return {
                    disabled: this.nowIsoLabel === this.dateIsoLabel
                };
            }
        },

        methods: {
            /**
             * @param {Date} date
             * @returns {string}
             */
            calcDateLabel(date) {
                return date.toLocaleDateString('ru', {
                    month: 'short',
                    day: 'numeric'
                });
            },

            /**
             * @param {Date} date
             * @returns {string}
             */
            calcDateIsoLabel(date) {
                return date.toISOString().split('T')[0];
            }
        },

        getDateFromRequest(request) {
            let date = new Date();

            if (request) {
                let routeDate = new Date(request);

                if (isNaN(routeDate.getTime()) === false) {
                    date = routeDate;
                }
            }

            return date;
        }
    };
</script>