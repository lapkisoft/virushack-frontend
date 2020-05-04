<template>
    <div class="page page-main">
        <img src="/img/heart.png" alt="" class="logo">

        <ul class="menu">
            <li>
                <router-link class="button" to="/todo-list">Чек-лист на сегодня</router-link>
            </li>
            <li>
                <router-link class="button" to="/indication-list">Измерения</router-link>
            </li>
            <li>
                <router-link class="button" to="/quiz">Опрос состояния больного</router-link>
            </li>
            <li>
                <router-link class="button" to="/recommendations">Рекомендации</router-link>
            </li>
            <li>
                <router-link class="button" to="/settings">Настройка</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import './assets/scss/_Main.scss';

    export default {
        name: 'page-main'
    };
</script>