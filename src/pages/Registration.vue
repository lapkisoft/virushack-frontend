<template>
    <div class="page page-registration">
        <h1>Персональная анкета</h1>

        <form action="" @submit.prevent="submit">
            <div class="form-group">
                <input type="text"
                       class="form-control"
                       v-model="name"
                       placeholder="Введите имя подопечного"
                       required>
            </div>

            <div class="form-group">
                <input type="text"
                       class="form-control"
                       v-model="age"
                       placeholder="Количество полных лет подопечного"
                       required>
            </div>

            <div class="form-group">
                <input type="text"
                       class="form-control"
                       v-model="diagnosis"
                       placeholder="Диагноз"
                       required>
            </div>

            <div class="form-group">
                <input type="text"
                       class="form-control"
                       v-model="symptoms"
                       placeholder="Симптомы"
                       required>
            </div>

            <h3>Ваш подопечный - лежачий?</h3>

            <div class="row">
                <div class="col">
                    <div class="radio">
                        <input id="registration-bed-patient-true-input"
                               type="radio"
                               name="bed_patient"
                               v-model="bed_patient"
                               required
                               :value="true">

                        <label for="registration-bed-patient-true-input">Да</label>
                    </div>
                </div>

                <div class="col">
                    <div class="radio">
                        <input id="registration-bed-patient-false-input"
                               type="radio"
                               name="bed_patient"
                               v-model="bed_patient"
                               required
                               :value="false">

                        <label for="registration-bed-patient-false-input">Нет</label>
                    </div>
                </div>
            </div>

            <div class="controls">
                <button type="submit" class="button">Сохранить и продолжить</button>
            </div>
        </form>
    </div>
</template>

<script>
    import './assets/scss/_Registration.scss';

    export default {
        name: 'page-registration',

        beforeRouteEnter(to, from, next) {
            window.scrollTo(0, 0);

            next();
        },

        data() {
            let name = '',
                age = '',
                diagnosis = '',
                symptoms = '',
                bed_patient = null;

            if (this.$route.name !== 'page-registration') {
                name = localStorage.getItem('registration_name') || '';
                age = localStorage.getItem('registration_age') || '';
                diagnosis = localStorage.getItem('registration_diagnosis') || '';
                symptoms = localStorage.getItem('registration_symptoms') || '';
                bed_patient = localStorage.getItem('registration_bed_patient') === '1';
            }

            return {
                name,
                age,
                diagnosis,
                symptoms,
                bed_patient
            };
        },

        methods: {
            submit() {
                localStorage.setItem('registration_name', this.name);
                localStorage.setItem('registration_age', this.age);
                localStorage.setItem('registration_diagnosis', this.diagnosis);
                localStorage.setItem('registration_symptoms', this.symptoms);
                localStorage.setItem('registration_bed_patient', this.bed_patient ? '1' : '');

                this.$router.push({name: 'page-dashboard'});
            }
        }
    };
</script>