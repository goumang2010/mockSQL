import path from 'path';
import fs from 'fs';
import moment from 'moment';
import Module from 'module';

export function getModule(spath) {
    try {
        let res = Module.prototype.require.call(null, spath);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export function getContent(spath) {
    try {
        let res = fs.readFileSync(spath, 'utf8');
        return res;
    } catch (err) {
        console.log(err);
    }
}

export function formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
}
