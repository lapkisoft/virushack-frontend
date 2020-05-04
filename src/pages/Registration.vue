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

            <h3>Больной лежачий?</h3>

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

        data() {
            return {
                name: '',
                age: '',
                diagnosis: '',
                symptoms: '',
                bed_patient: null
            };
        },

        methods: {
            submit() {
                this.$router.push({name: 'page-dashboard'});
            }
        }
    };
</script>