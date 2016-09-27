const storage = require('electron-json-storage');

function cacheGet(target, name, descriptor) {
    var oldFunc = descriptor.value;
    descriptor.value = async function(...argv) {
        let cachekey = name + JSON.stringify(argv);
        if (cachekey in this.cache) {
            return this.cache[cachekey];
        } else {
            let res = await oldFunc.apply(this, argv);
            this.cache[cachekey] = res;
            return res;
        }
    };
    return descriptor;
}

function cacheSet(target, name, descriptor) {
    var oldFunc = descriptor.value;
    descriptor.value = async function(...argv) {
        this.cache = {};
        return await oldFunc.apply(this, argv);
    };
    return descriptor;
}

function getQueryFilter({type, keyword}) {
    return x => {
        let pass = true;
        if (type && type !== 'all' && x.type !== type) {
            pass = false;
        }
        if (keyword && !(x.tbname.includes(keyword))) {
            pass = false;
        }
        return pass;
    };
}

class Tasks {
    constructor() {
        this.cache = {};
    }
    async init() {
        return new Promise((resolve, reject) => {
            if (this.list) {
                resolve(true);
            } else {
                storage.get('tasklist', (error, data) => {
                    if (error) {
                        reject(error);
                    };
                    this.list = Object.values(data);
                    resolve(data);
                });
            }
        });
    }

    @cacheGet
    count({type, keyword}) {
        let filter = getQueryFilter({type, keyword});
        return this.list.filter(filter).length;
    }

    // task = {
    //     type: 'insert',
    //     tbname: 'xxx',
    //     date: 'xxxx',
    //     argv: {

    //     }
    // }
    @cacheSet
    async add(task) {
        this.list.push(task);
        await this.save();
    }

    @cacheSet
    async delete(i) {
        this.list.splice(i, 1);
        await this.save();
    }

    @cacheGet
    pagination({page = 1, limit = 10, skip = 0, type, keyword}) {
        let filter = getQueryFilter({type, keyword});
        let start = skip + (page - 1) * limit;
        let end = start + limit;
        return this.list.filter(filter).slice(start, end);
    }

    async save() {
        return new Promise((resolve, reject) => {
            storage.set('tasklist', this.list, function(error) {
                if (error) throw error;
            });
        });
    }
}

const tasks = new Tasks();

export default async function getTasks() {
    await tasks.init();
    return tasks;
};
