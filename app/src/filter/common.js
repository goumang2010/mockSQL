import Vue from 'vue';
import moment from 'moment';

function objToStr(key, value) {
    let type = Object.prototype.toString.call(value);
    if (type === '[object Object]') {
        let res = Object.entries(value);
        return res.map(x => {
            return objToStr.apply(null, x);
        }).join('  ');
    } else if (type === '[object Array]') {
        let res = value;
        return res.map(x => {
            return objToStr(null, x);
        }).join(',');
    } else if (key) {
        return `${key}: ${value}`;
    } else {
        return `${value}`;
    }
}

Vue.filter('Date', function(value, format) {
    return moment(value).format(format);
});

Vue.filter('Object', function(value) {
    if (value) {
        return objToStr('detail', value);
    } else {
        return '';
    }
});

Vue.filter('uppercase', function(value) {
    return `${value}`.toUpperCase();
});

