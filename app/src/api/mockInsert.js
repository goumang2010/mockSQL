import randomstring from 'randomstring';
import {getModule, getContent, formatDate} from '../util/common';

function formatValue(type, value) {
    if (type !== 'numeric') {
        value = `'${value}'`;
    } else {
        value = `${value}`;
    }
    return value;
}
function mockData(i, tbname, schema, filter) {
    let keyArray = [];
    let valueArray = [];
    Object.keys(schema).forEach(key => {
        keyArray.push(key);
        let schemaKey = schema[key];
        let fixedObj = filter.find(x => x.name === key);
        if (fixedObj) {
            let valobj = fixedObj.value.split(',');
            let len = valobj.length;
            let val;
            if (len === 1) {
                val = formatValue(fixedObj.type, valobj[0]);
            } else {
                val = formatValue(fixedObj.type, valobj[Math.floor(Math.random() * len)]);
            }
            valueArray.push(val);
        } else {
            valueArray.push(getValue(i, schemaKey));
        }
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
        if (type.includes('int') || type.includes('float')) {
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
    let filter = argv.filter;
    let times = parseInt(argv.r) || 10;
    argv._.forEach((x) => {
        let schema = processPath(x);
        try {
            for (i = 0; i < times; i++) {
                let res = mockData(i, tbname, schema, filter);
                result.push(res);
            }
        } catch (err) {
            console.log(err);
        }
    }
    );
    return result;
};
