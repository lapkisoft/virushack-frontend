import Vue from './vue.js';

Vue.filter('timeFromTimestamp', (timestamp) => {
    if (typeof timestamp !== 'string') {
        return '---';
    }

    let matches = timestamp.match(/^\d{4}-\d{2}-\d{2}T(\d{2}:\d{2})/);

    if (matches === null || matches[1] === '00:00') {
        return '---';
    }

    return matches[1];
});
