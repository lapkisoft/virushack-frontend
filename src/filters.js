import Vue from './vue.js';

Vue.filter('timeFromTimestamp', (timestamp, defaultValue) => {
    if (typeof timestamp !== 'string') {
        return defaultValue;
    }

    let matches = timestamp.match(/^\d{4}-\d{2}-\d{2}T(\d{2}:\d{2})/);

    if (matches === null || matches[1] === '00:00') {
        return defaultValue;
    }

    return matches[1];
});

Vue.filter('dateLabel', (timestamp, defaultValue) => {
    if (typeof timestamp !== 'string') {
        return defaultValue;
    }

    let date = new Date(timestamp);

    if (isNaN(date.getTime())) {
        return defaultValue;
    }

    return date.toLocaleString('ru', {
        day: 'numeric',
        month: 'short',
        weekday: 'short'
    });
});

Vue.filter('dateTimeLabel', (timestamp, defaultValue) => {
    if (typeof timestamp !== 'string') {
        return defaultValue;
    }

    let date = new Date(timestamp);

    if (isNaN(date.getTime())) {
        return defaultValue;
    }

    return date.toLocaleString('ru', {
        day: 'numeric',
        month: 'short',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
});
