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
    descriptor.writable = false;
    descriptor.configurable = false;
    return descriptor;
}

function cacheSet(target, name, descriptor) {
    var oldFunc = descriptor.value;
    descriptor.value = async function(...argv) {
        this.cache = {};
        return await oldFunc.apply(this, argv);
    };
    descriptor.writable = false;
    descriptor.configurable = false;
    return descriptor;
}

function getQueryFilter({type, keyword}) {
    let typeflag = (type && type !== 'all') ? `if(x.type !== '${type}'){pass = false;}` : '';
    let keyflag = keyword ? `if(!(x.tbname.includes('${keyword}'))){pass = false;}` : '';
    let funStr = `let pass = true;${typeflag}${keyflag}return pass;`;
    return new Function('x', funStr);
}

function getQuerySorter({sortBy, orderBy}) {
    let res = 0;
    if (sortBy && orderBy) {
        if (orderBy === 'asc') {
            return (a, b) => (a[sortBy] > b[sortBy] ? 1 : -1);
        } else {
            return (a, b) => (b[sortBy] > a[sortBy] ? 1 : -1);
        }
    } else {
        return (a, b) => 0;
    }
}

export class Task {
    constructor({type, tbname = '', argv}) {
        this.uuid = this.genUUID();
        this.date = Date.now();
        this.type = type;
        this.tbname = tbname;
        this.argv = argv;
    }
    genUUID() {
        var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
}

export class Tasks {
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
        // console.log(filter);
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
        if (task instanceof Task) {
            this.list.push(task);
            await this.save();
        }
    }

    // delete by object or uuid
    @cacheSet
    async deleteItem(obj) {
        let i;
        if (typeof obj === 'object') {
            i = this.list.findIndex(x => x === obj);
        } else {
            i = this.list.findIndex(x => x.uuid === obj);
        }
        if (i > -1) {
            this.list.splice(i, 1);
            await this.save();
        }
    }

    @cacheSet
    async deleteAll() {
        this.list = [];
        await this.save();
    }

    @cacheGet
    pagination({page = 1, limit = 10, skip = 0, type, keyword, sortBy, orderBy}) {
        let filter = getQueryFilter({type, keyword});
        let sorter = getQuerySorter({sortBy, orderBy});
        let start = skip + (page - 1) * limit;
        let end = start + limit;
        return this.list.filter(filter).sort(sorter).slice(start, end);
    }

    async save() {
        return new Promise((resolve, reject) => {
            storage.set('tasklist', this.list, function(error) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve();
            });
        });
    }
}

export const tasks = new Tasks();

export const initTasks = async () => {
    await tasks.init();
    return tasks;
};
