<template>
    <div class="page page-support">
        <h1>Поддержка</h1>

        <h3>Горячие линии</h3>

        <div class="panel">
            <div class="panel-header">Горячая линия фонда помощи хосписам «Вера» по вопросам оказания паллиативной помощи</div>
            <div class="panel-body">
                <p class="phone">8-800-700-84-36 (кругл., бесплатно)</p>
                <p class="email">fund@hospicefund.ru</p>
                <p class="globe">https://www.hospicefund.ru/</p>
            </div>
        </div>

        <div class="panel">
            <div class="panel-header">Всероссийская горячая линия психологической помощи онкологическим больным и их близким «Ясное утро»</div>
            <div class="panel-body">
                <p class="phone">8-800-700-84-36 (кругл., бесплатно)</p>
                <p class="email">fund@hospicefund.ru</p>
                <p class="globe">https://www.hospicefund.ru/</p>
            </div>
        </div>

        <h3>Просветительские сайты</h3>

        <div class="panel">
            <div class="panel-header">Ассоциация профессиональных участников хосписной помощи</div>
            <div class="panel-body">
                <p class="globe">https://www.pro-hospice.ru/</p>
            </div>
        </div>

        <div class="panel">
            <div class="panel-header">Ассоциация профессиональных участников хосписной помощи</div>
            <div class="panel-body">
                <p class="globe">https://www.pro-hospice.ru/</p>
            </div>
        </div>
    </div>
</template>

<script>
    import './assets/scss/_Support.scss';

    export default {
        name: 'page-support',

        beforeRouteEnter(to, from, next) {
            window.scrollTo(0, 0);

            next();
        }
    };
</script>