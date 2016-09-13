const  fs = require('fs') ;
const path = require('path');
var randomstring = require("randomstring");

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

module.exports = function execmd(argv){
	let i = 0;
	function completePath(spath){
		spath=spath||"";
		console.log(spath);
		let state=fs.lstatSync(spath);
		if(state.isDirectory()){
			spath=path.resolve(spath,'package.json')
		}
		return spath;
	}

	function getSchema(path) {
		let schemaPath = completePath(path);
		return require(schemaPath);

	}

	function getValue(schemaKey) {
			switch(schemaKey) {
				case String:
				return `'${randomstring.generate({length: 3,charset: 'string'})}'`;
				break;
				case Number:
				return `${randomstring.generate({length: 3,charset: 'numeric'})}`;
				break;
				case Date:
				let now = new Date();
                return `'${new Date(now.getTime() - i* 2 * 60 * 60 * 1000).Format('yyyy-MM-dd hh:mm:ss')}'`;
				break;
				default:
				if(schemaKey.type) {
					let type = schemaKey.type.toLowerCase();
					switch(type) {
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
				break;
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
		// console.log(keyArray.length);
		// console.log(valueArray.length);
		return `INSERT INTO ${tbname} (${keyArray.join(',')}) VALUES (${valueArray.join(',')});` 
	}
	let result = [];
	argv._.forEach(x =>
		{
			try{
				let schema = getSchema(x);
				let times = parseInt(argv.r) || 10;
				for(i = 0; i<times; i++) {
					let res = mockData(schema);
					result.push(res);
				}

			}
			catch(err){
				console.log(err);
			}
		}
	);
	return result;
};