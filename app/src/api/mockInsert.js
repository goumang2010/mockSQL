import randomstring from 'randomstring';
import {formatDate} from '../util/common';
import {mockData, convertSQLtoSchema} from './mockInsert.cli.js';
import {getModule, getContent} from '../util/broswer.js';

export default async function(argv) {
    let i = 0;
    let tbname = argv.t || 'table_name';
    let result = [];
    let processPath;
    switch (argv.f) {
    case 0:
        processPath = getModule;
        break;
    case 2:
        processPath = async (spath) => {
            let content = await getContent(spath);
            return convertSQLtoSchema(content);
        };
        break;
    default:
        processPath = getModule;
        break;
    }
    let filter = argv.filter;
    let times = parseInt(argv.r) || 10;
    for (let x of argv._files) {
        try {
            let schema = await processPath(x);
            for (i = 0; i < times; i++) {
                let res = mockData(i, tbname, schema, filter);
                result.push(res);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return result;
};
