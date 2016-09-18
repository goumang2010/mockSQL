import randomstring from 'randomstring';
import {getModule, getContent, formatDate} from '../util/common';

function mockData(i, tbname, schema) {
    let keyArray = [];
    let valueArray = [];
    Object.keys(schema).forEach(key => {
        keyArray.push(key);
        let schemaKey = schema[key];
        valueArray.push(getValue(i, schemaKey));
    });
    return `INSERT INTO ${tbname} (${keyArray.join(',')}) VALUES (${valueArray.join(',')});`;
}

function getValue(i, schemaKey) {
    switch (schemaKey) {
    case String:
        return `'${randomstring.generate({length: 3, charset: 'string'})}'`;
    case Number:
        return `${randomstring.generate({length: 3, charset: 'numeric'})}`;
    case Date:
        let now = new Date();
        return `'${formatDate(new Date(now.getTime() - i * 2 * 60 * 60 * 1000))}'`;
    default:
        if (schemaKey.type) {
            let type = schemaKey.type.toLowerCase();
            switch (type) {
            case 'number':
                schemaKey = Number;
                break;
            case 'string':
                schemaKey = String;
                break;
            case 'date':
                schemaKey = Date;
                break;
            }
            return getValue(schemaKey);
        } else {
            return '';
        }
    }
}

function convertSQLtoSchema(input) {
    let regex = /[\s]*`(.+)`[\s]+(\w+).+?[COMMENT[\s]+'(.+)']?/g;
    let matches = [];
    let output = {};
    while ((matches = regex.exec(input))) {
        let type = matches[2].toLowerCase();
        if (type.includes('int')) {
            type = Number;
        } else if (type.includes('char')) {
            type = String;
        } else if (type.includes('date')) {
            type = Date;
        }
        output[matches[1]] = type;
    }
    return output;
}

export default function(argv) {
    let i = 0;
    let tbname = argv.t || 'table_name';
    let result = [];
    let processPath;
    switch (argv.f) {
    case 0:
        processPath = getModule;
        break;
    case 2:
        processPath = (spath) => {
            let content = getContent(spath);
            return convertSQLtoSchema(content);
        };
        break;
    default:
        processPath = getModule;
        break;
    }
    argv._.forEach((x) => {
        let schema = processPath(x);
        let times = parseInt(argv.r) || 10;
        try {
            for (i = 0; i < times; i++) {
                let res = mockData(i, tbname, schema);
                result.push(res);
            }
        } catch (err) {
            console.log(err);
        }
    }
    );
    return result;
};
