const storage = window.localStorage;
export function set(name, value) {
    try {
        storage.setItem(name, JSON.stringify(value));
    } catch (e) {
        console.log(e);
    }
}

export function del(name) {
    storage.removeItem(name);
}

export function get(name, callback) {
    let res = storage.getItem(name);
    if (res) {
        try {
            res = eval(res);
            return callback(null, res);
        } catch (e) {
            console.log(e);
            callback(e, res);
        }
    } else {
        callback(null, res);
    }
}
