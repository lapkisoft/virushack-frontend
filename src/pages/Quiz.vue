<template>
    <div class="page page-quiz">
        <h1>Опрос о состоянии подопечного</h1>

        <form action="" @submit.prevent="submit">
            <h3>Настроение:</h3>

            <div class="smile-selector">
                <div class="radio">
                    <input id="quiz-q1-a1-input" type="radio" name="a1" v-model="q1" value="1">
                    <label for="quiz-q1-a1-input">
                        <img src="/img/icons/smile-a.svg" alt="">
                    </label>
                </div>
                <div class="radio">
                    <input id="quiz-q1-a2-input" type="radio" name="a1" v-model="q1" value="2">
                    <label for="quiz-q1-a2-input">
                        <img src="/img/icons/smile-b.svg" alt="">
                    </label>
                </div>
                <div class="radio">
                    <input id="quiz-q1-a3-input" type="radio" name="a1" v-model="q1" value="3">
                    <label for="quiz-q1-a3-input">
                        <img src="/img/icons/smile-c.svg" alt="">
                    </label>
                </div>
            </div>

            <h3>Психологическое состояние:</h3>

            <ul class="checkbox-list">
                <li>
                    <input id="quiz-q2-a1-input"
                           type="radio"
                           v-model="q2"
                           name="q2"
                           required
                           :value="4">

                    <label for="quiz-q2-a1-input">
                        <div class="checkbox"></div>
                        <div class="name">Спокойное</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q2-a2-input"
                           type="radio"
                           v-model="q2"
                           name="q2"
                           required
                           :value="3">

                    <label for="quiz-q2-a2-input">
                        <div class="checkbox"></div>
                        <div class="name">Настороженное</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q2-a3-input"
                           type="radio"
                           v-model="q2"
                           name="q2"
                           required
                           :value="2">

                    <label for="quiz-q2-a3-input">
                        <div class="checkbox"></div>
                        <div class="name">Удовлетворительное</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q2-a4-input"
                           type="radio"
                           v-model="q2"
                           name="q2"
                           required
                           :value="1">

                    <label for="quiz-q2-a4-input">
                        <div class="checkbox"></div>
                        <div class="name">Тяжелое</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q2-a5-input"
                           type="radio"
                           v-model="q2"
                           name="q2"
                           required
                           :value="0">

                    <label for="quiz-q2-a5-input">
                        <div class="checkbox"></div>
                        <div class="name">Крайне тяжелое</div>
                    </label>
                </li>
            </ul>

            <h3>Сон:</h3>

            <ul class="checkbox-list">
                <li>
                    <input id="quiz-q3-a1-input"
                           type="radio"
                           v-model="q3"
                           name="q3"
                           required
                           :value="4">

                    <label for="quiz-q3-a1-input">
                        <div class="checkbox"></div>
                        <div class="name">Снились тревожные сны</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q3-a2-input"
                           type="radio"
                           v-model="q3"
                           name="q3"
                           required
                           :value="3">

                    <label for="quiz-q3-a2-input">
                        <div class="checkbox"></div>
                        <div class="name">Не выспался</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q3-a3-input"
                           type="radio"
                           v-model="q3"
                           name="q3"
                           required
                           :value="2">

                    <label for="quiz-q3-a3-input">
                        <div class="checkbox"></div>
                        <div class="name">Просыпался ночью</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q3-a4-input"
                           type="radio"
                           v-model="q3"
                           name="q3"
                           required
                           :value="1">

                    <label for="quiz-q3-a4-input">
                        <div class="checkbox"></div>
                        <div class="name">Проблемы с засыпанием</div>
                    </label>
                </li>
            </ul>

            <h3>Общение:</h3>

            <ul class="checkbox-list">
                <li>
                    <input id="quiz-q4-a1-input"
                           type="radio"
                           v-model="q4"
                           name="q4"
                           required
                           :value="4">

                    <label for="quiz-q4-a1-input">
                        <div class="checkbox"></div>
                        <div class="name">Неохотно общается на обычные темы</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q4-a2-input"
                           type="radio"
                           v-model="q4"
                           name="q4"
                           required
                           :value="3">

                    <label for="quiz-q4-a2-input">
                        <div class="checkbox"></div>
                        <div class="name">Неохотно общается о самочувствии</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q4-a3-input"
                           type="radio"
                           v-model="q4"
                           name="q4"
                           required
                           :value="2">

                    <label for="quiz-q4-a3-input">
                        <div class="checkbox"></div>
                        <div class="name">Не разговаривает с родственниками</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q4-a4-input"
                           type="radio"
                           v-model="q4"
                           name="q4"
                           required
                           :value="1">

                    <label for="quiz-q4-a4-input">
                        <div class="checkbox"></div>
                        <div class="name">Повышенная обидчивость</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q4-a5-input"
                           type="radio"
                           v-model="q4"
                           name="q4"
                           required
                           :value="0">

                    <label for="quiz-q4-a5-input">
                        <div class="checkbox"></div>
                        <div class="name">Раздраженность без причин</div>
                    </label>
                </li>
            </ul>

            <h3>Досуг:</h3>

            <ul class="checkbox-list">
                <li>
                    <input id="quiz-q5-a1-input"
                           type="radio"
                           v-model="q5"
                           name="q5"
                           required
                           :value="4">

                    <label for="quiz-q5-a1-input">
                        <div class="checkbox"></div>
                        <div class="name">Не радуется запланированному досугу</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q5-a2-input"
                           type="radio"
                           v-model="q5"
                           name="q5"
                           required
                           :value="3">

                    <label for="quiz-q5-a2-input">
                        <div class="checkbox"></div>
                        <div class="name">Игнорирует веселье</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q5-a3-input"
                           type="radio"
                           v-model="q5"
                           name="q5"
                           required
                           :value="2">

                    <label for="quiz-q5-a3-input">
                        <div class="checkbox"></div>
                        <div class="name">Предпочитает быть один</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q5-a4-input"
                           type="radio"
                           v-model="q5"
                           name="q5"
                           required
                           :value="1">

                    <label for="quiz-q5-a4-input">
                        <div class="checkbox"></div>
                        <div class="name">Читает / смотрит телевизор</div>
                    </label>
                </li>
                <li>
                    <input id="quiz-q5-a5-input"
                           type="radio"
                           v-model="q5"
                           name="q5"
                           required
                           :value="0">

                    <label for="quiz-q5-a5-input">
                        <div class="checkbox"></div>
                        <div class="name">Охотно принимает гостей/ходит в гости</div>
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
    import './assets/scss/_Quiz.scss';

    export default {
        name: 'page-quiz',

        data() {
            return {
                q1: '1',
                q2: '3',
                q3: '4',
                q4: '4',
                q5: '3'
            };
        },

        methods: {
            submit() {
                this.$router.push({name: 'page-dashboard'});
            }
        }
    };
</script>
