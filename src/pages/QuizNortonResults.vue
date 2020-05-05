<template>
    <div class="page page-quiz-norton-results">
        <h1>Результат</h1>

        <template v-if="isGood">
            <h3>
                По шкале оценки риска возникновения пролежней (Norton) у Вашего подопечного
                <b>не выявлено</b> риска возникновения.
            </h3>

            <p>
                Поздравляем, это отличный результат! Но не стоит расслабляться.
                Для закрепления результата Вы можете обратиться к нашим рекомендациям.
            </p>
            
            <br>
            <br>
        </template>

        <template v-if="isNotGood">
            <h3>
                По шкале оценки риска возникновения пролежней (Norton) у Вашего подопечного
                <b>выявлен умеренный риск</b> возникновения.
            </h3>

            <a href="#" class="plank-link">
                <div class="icon">
                    <img src="/img/icons/light.svg" alt="">
                </div>

                <div class="label">
                    Умеренный риск возникновения пролежней это очень важно!
                    <br>
                    <span>В список задач добавлены новые ежедневные задачи</span>
                </div>
            </a>
        </template>

        <template v-if="isBad">
            <h3>
                По шкале оценки риска возникновения пролежней (Norton) у Вашего подопечного
                <b>выявлен высокий риск</b> возникновения.
            </h3>

            <a href="#" class="plank-link">
                <div class="icon">
                    <img src="/img/icons/light.svg" alt="">
                </div>

                <div class="label">
                    Высокий риск возникновения пролежней это очень важно!
                    <br>
                    <span>В список задач добавлены новые ежедневные задачи</span>
                </div>
            </a>
        </template>

        <h1>Рекомендации</h1>

        <p>Мы сделали подборку обучающих видео и статей, про профилактику и лечение пролежней, доступ к ним в разделе меню “Рекомендации”.</p>
        
        <div class="img-wrapper">
            <img src="/img/quiz-norton-results.png" alt="">
        </div>

        <div class="controls">
            <router-link to="/recommendations" class="button">Читать рекомендации</router-link>
        </div>
    </div>
</template>

<script>
    import './assets/scss/_QuizNortonResults.scss';

    export default {
        name: 'page-quiz-norton-results',

        beforeRouteEnter(to, from, next) {
            window.scrollTo(0, 0);

            next();
        },

        data() {
            let result = parseInt(`${this.$route.params.result}`);

            if (isNaN(result)) {
                result = 5;
            }

            result = Math.max(Math.min(result, 20), 5);

            return {
                result
            };
        },

        computed: {
            isGood() {
                return this.result >= 15;
            },

            isNotGood() {
                return this.result < 15 && this.result >= 12;
            },

            isBad() {
                return this.result < 12;
            }
        }
    };
</script>