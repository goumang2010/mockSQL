import randomstring from 'randomstring';

function mockData(tbname, filter, condition) {
    let ctrstr = filter.map(x => {
        let {valobj, len, type, name} = x;
        let val;
        if (len === 1) {
            val = valobj[0];
        } else {
            val = valobj[Math.floor(Math.random() * len)];
        }
        if (type === 'numeric') {
            return `${name} = ${val}`;
        } else {
            return `${name} = '${val}'`;
        }
    }).join(',');
    return `UPDATE ${tbname} SET ${ctrstr} WHERE ${condition};`;
}

export default function(argv) {
    let tbname = argv.t || 'table_name';
    let filter = argv.filter;
    let times = parseInt(argv.r) || 10;
    let condition = argv.c || '1 = 1';
    filter = filter.map(x => {
        x.valobj = x.value.split(',');
        x.len = x.valobj.length;
        return x;
    });
    let result = Array.from({ length: times }, () => mockData(tbname, filter, condition));
    return result;
};
