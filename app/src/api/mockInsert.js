import randomstring from 'randomstring';
import {getSchema, formatDate} from '../util/fs';

export default function(argv) {
    let i = 0;
    function getValue(schemaKey) {
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

    let tbname = argv.t || 'table_name';

    function mockData(schema) {
        let keyArray = [];
        let valueArray = [];
        Object.keys(schema).forEach(key => {
            keyArray.push(key);
            let schemaKey = schema[key];
            valueArray.push(getValue(schemaKey));
        });
        return `INSERT INTO ${tbname} (${keyArray.join(',')}) VALUES (${valueArray.join(',')});`;
    }
    let result = [];
    argv._.forEach((x) => {
        try {
            let schema = getSchema(x);
            let times = parseInt(argv.r) || 10;
            for (i = 0; i < times; i++) {
                let res = mockData(schema);
                result.push(res);
            }
        } catch (err) {
            console.log(err);
        }
    }
    );
    return result;
};
