<template>
    <div class="page page-main">
        <img src="/img/logo-main.png" alt="" class="logo">

        <h2>Добро пожаловать</h2>
        <h3>Добавьте вашего подопечного.<br>Это займет всего минуту.</h3>

        <div class="controls">
            <router-link to="/registration" class="button button-registration">Добавить подопечного</router-link>
        </div>
    </div>
</template>

<script>
    import './assets/scss/_Main.scss';

    export default {
        name: 'page-main'
    };
</script>