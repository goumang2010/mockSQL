var fs = require('fs');
var path = require('path');
var { exec, execSync } = require('child_process');
var os = require('os');
var ora = require('ora');


let dirpath = path.join(__dirname, '../builds/web');
var args = {
	name: 'goumang2010',
	email: 'goumang2010@live.com',
	repo: {
		url: 'origin',
		branch: 'gh-pages'
	}
};

if(process.env.GH_REF) {
	args.repo.url = 'https://' + process.env.GH_TOKEN + '@' + process.env.GH_REF;
	execSync('git config user.name ' + args.name);
	execSync('git config user.email ' + args.email);
}

var pushparam = args.repo.url + ' ' + args.repo.branch;

function makeSubtree() {
	if (!fs.existsSync(dirpath)) {
		fs.mkdirSync(dirpath);
	}

	if (!fs.existsSync(path.join(__dirname, './dont-delete'))) {
		let spinner = ora(`Doing some preparation work ...`).start();

		try {

			if (fs.readdirSync(dirpath).length > 1) {
				execSync(os.platform() === 'win32' ? `rd /q/s ${dirpath}` : `rm -rf ${dirpath}`);
				fs.mkdirSync(dirpath);
				execSync(`git add -A && git commit -m "clean workspace for add subtree"`);
			}

			execSync('git subtree add -P builds/web ' +  pushparam).stdout.pipe(process.stdout);

		} catch (err) {
			console.log(err.message);
		}
		
		fs.writeFileSync(path.join(__dirname, './dont-delete'), "Just check subtree status. Please do not delete.");
		
		spinner.stop();
		
	} else {
		return true;
	}
}


makeSubtree();

execSync('git subtree pull -P builds/web ' + pushparam);
execSync('git pull ' + pushparam);


execSync('npm run pack:web');

console.log('pack web completed')

//build CNAME
fs.writeFileSync(path.join(dirpath, './CNAME'), "sql.chuune.cn");

try {
	execSync('git add --all -f builds/web&& git commit -m build-gitpage');
	execSync('git push ' + pushparam);
} catch (err) {
	// console.log(err.message);
}

execSync('git subtree push -P builds/web ' + pushparam);
