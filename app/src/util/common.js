import path from 'path';
import fs from 'fs';
import moment from 'moment';
import Module from 'module';

export function getSchema(spath) {
    try {
        let res = Module.prototype.require.call(null, spath);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export function formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
}
