<template>
    <div class="page page-quiz-norton">
        <h1 style="font-size: 20px;">Опрос на выявление опасности образования пролежней</h1>

        <form action="" @submit.prevent="submit">
            <h3>Общее состояние:</h3>

            <ul class="checkbox-list">
                <li>
                    <input id="quiz-norton-q1-a1-input"
                           type="radio"
                           v-model="q1"
                           name="q1"
                           required
                           :value="4">

                    <label for="quiz-norton-q1-a1-input">
                        <div class="checkbox"></div>
                        <div class="name">Хорошее</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q1-a2-input"
                           type="radio"
                           v-model="q1"
                           name="q1"
                           required
                           :value="3">

                    <label for="quiz-norton-q1-a2-input">
                        <div class="checkbox"></div>
                        <div class="name">Удовлетворительное</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q1-a3-input"
                           type="radio"
                           v-model="q1"
                           name="q1"
                           required
                           :value="2">

                    <label for="quiz-norton-q1-a3-input">
                        <div class="checkbox"></div>
                        <div class="name">Тяжелое</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q1-a4-input"
                           type="radio"
                           v-model="q1"
                           name="q1"
                           required
                           :value="1">

                    <label for="quiz-norton-q1-a4-input">
                        <div class="checkbox"></div>
                        <div class="name">Крайне тяжелое</div>
                    </label>
                </li>
            </ul>

            <h3>Психологическое состояние:</h3>

            <ul class="checkbox-list">
                <li>
                    <input id="quiz-norton-q2-a1-input"
                           type="radio"
                           v-model="q2"
                           name="q2"
                           required
                           :value="4">

                    <label for="quiz-norton-q2-a1-input">
                        <div class="checkbox"></div>
                        <div class="name">Настороженное</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q2-a2-input"
                           type="radio"
                           v-model="q2"
                           name="q2"
                           required
                           :value="3">

                    <label for="quiz-norton-q2-a2-input">
                        <div class="checkbox"></div>
                        <div class="name">Удовлетворительное</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q2-a3-input"
                           type="radio"
                           v-model="q2"
                           name="q2"
                           required
                           :value="2">

                    <label for="quiz-norton-q2-a3-input">
                        <div class="checkbox"></div>
                        <div class="name">Тяжелое</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q2-a4-input"
                           type="radio"
                           v-model="q2"
                           name="q2"
                           required
                           :value="1">

                    <label for="quiz-norton-q2-a4-input">
                        <div class="checkbox"></div>
                        <div class="name">Крайне тяжелое</div>
                    </label>
                </li>
            </ul>

            <h3>Активность:</h3>

            <ul class="checkbox-list">
                <li>
                    <input id="quiz-norton-q3-a1-input"
                           type="radio"
                           v-model="q3"
                           name="q3"
                           required
                           :value="4">

                    <label for="quiz-norton-q3-a1-input">
                        <div class="checkbox"></div>
                        <div class="name">Ходьба</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q3-a2-input"
                           type="radio"
                           v-model="q3"
                           name="q3"
                           required
                           :value="3">

                    <label for="quiz-norton-q3-a2-input">
                        <div class="checkbox"></div>
                        <div class="name">С посторонней помощью</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q3-a3-input"
                           type="radio"
                           v-model="q3"
                           name="q3"
                           required
                           :value="2">

                    <label for="quiz-norton-q3-a3-input">
                        <div class="checkbox"></div>
                        <div class="name">Сидение в коляске</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q3-a4-input"
                           type="radio"
                           v-model="q3"
                           name="q3"
                           required
                           :value="1">

                    <label for="quiz-norton-q3-a4-input">
                        <div class="checkbox"></div>
                        <div class="name">Лежание в постели</div>
                    </label>
                </li>
            </ul>

            <h3>Подвижность:</h3>

            <ul class="checkbox-list">
                <li>
                    <input id="quiz-norton-q4-a1-input"
                           type="radio"
                           v-model="q4"
                           name="q4"
                           required
                           :value="4">

                    <label for="quiz-norton-q4-a1-input">
                        <div class="checkbox"></div>
                        <div class="name">Общая, хорошая</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q4-a2-input"
                           type="radio"
                           v-model="q4"
                           name="q4"
                           required
                           :value="3">

                    <label for="quiz-norton-q4-a2-input">
                        <div class="checkbox"></div>
                        <div class="name">Несколько ограничена</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q4-a3-input"
                           type="radio"
                           v-model="q4"
                           name="q4"
                           required
                           :value="2">

                    <label for="quiz-norton-q4-a3-input">
                        <div class="checkbox"></div>
                        <div class="name">Сильно ограничена</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q4-a4-input"
                           type="radio"
                           v-model="q4"
                           name="q4"
                           required
                           :value="1">

                    <label for="quiz-norton-q4-a4-input">
                        <div class="checkbox"></div>
                        <div class="name">Обездвиженность</div>
                    </label>
                </li>
            </ul>

            <h3>Контроль за функциями таза:</h3>

            <ul class="checkbox-list">
                <li>
                    <input id="quiz-norton-q5-a1-input"
                           type="radio"
                           v-model="q5"
                           name="q5"
                           required
                           :value="4">

                    <label for="quiz-norton-q5-a1-input">
                        <div class="checkbox"></div>
                        <div class="name">Недержание отсутствует</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q5-a2-input"
                           type="radio"
                           v-model="q5"
                           name="q5"
                           required
                           :value="3">

                    <label for="quiz-norton-q5-a2-input">
                        <div class="checkbox"></div>
                        <div class="name">Незначительное недержание</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q5-a3-input"
                           type="radio"
                           v-model="q5"
                           name="q5"
                           required
                           :value="2">

                    <label for="quiz-norton-q5-a3-input">
                        <div class="checkbox"></div>
                        <div class="name">Только мочи</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-norton-q5-a4-input"
                           type="radio"
                           v-model="q5"
                           name="q5"
                           required
                           :value="1">

                    <label for="quiz-norton-q5-a4-input">
                        <div class="checkbox"></div>
                        <div class="name">Двойное недержание</div>
                    </label>
                </li>
            </ul>

            <div class="controls">
                <button type="submit" class="button">Сохранить</button>
            </div>
        </form>
    </div>
</template>

<script>
    import './assets/scss/_QuizNorton.scss';

    export default {
        name: 'page-quiz-norton',

        data() {
            return {
                q1: 0,
                q2: 0,
                q3: 0,
                q4: 0,
                q5: 0
            };
        },

        computed: {
            result() {
                return this.q1 + this.q2 + this.q3 + this.q4 + this.q5;
            }
        },

        methods: {
            submit() {
                this.$router.push({
                    name: 'page-quiz-norton-results', params: {
                        result: this.result
                    }
                });
            }
        }
    };
</script>
