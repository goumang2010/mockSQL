export function set(name, value) {
    try {
        let Days = 30;
        let exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + value + ';expires=' + exp.toGMTString();
    } catch (e) {
        alert(e.message);
    }
}

export function del(name) {
    let expires = new Date(0);
    document.cookie = name + '=' + ';expires=' + expires.toUTCString();
}

export function get(code, callback) {
    let name = code;
    let allcookies = document.cookie;
    name += '=';
    let pos = allcookies.indexOf(name);
    if (pos !== -1) {
        let start = pos + name.length;
        let end = allcookies.indexOf(';', start);
        if (end === -1) end = allcookies.length;
        let value = allcookies.substring(start, end);
        if (callback) callback(null, value);
        return (value);
    } else {
        if (callback) callback(null, '');
        return '';
    }
}
