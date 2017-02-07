var fs = require('fs');
var path = require('path');
var { exec, execSync } = require('child_process');
var os = require('os');
var ora = require('ora');

let _exeSync = execSync;
execSync = function (cmd) {
	console.log(cmd);
	return _exeSync(cmd);
}

let dirpath = path.join(__dirname, '../builds/web');
var args = {
	name: 'goumang2010',
	email: 'goumang2010@live.com',
	repo: {
		url: 'origin',
		branch: 'gh-pages'
	}
};

if (process.env.GH_REF) {
	var myrepo = 'https://' + process.env.GH_TOKEN + '@' + process.env.GH_REF;
	execSync('git config user.name ' + args.name);
	execSync('git config user.email ' + args.email);
	execSync('git remote add myrepo ' + myrepo);
	execSync('git fetch myrepo');
	args.repo.url = 'myrepo';
}

function makeSubtree() {
	var spinner = ora(`Doing some preparation work ...`).start();
	console.log('...');
	var cleanSubtree = function() {
		if (fs.existsSync(dirpath)) {
			if (fs.readdirSync(dirpath).length > 1) {
				execSync(os.platform() === 'win32' ? `rd /q/s ${dirpath}` : `rm -rf ${dirpath}`);
				execSync(`git add -A && git commit -m "clean workspace for add subtree"`);
			} else {
				//empty folder
				fs.rmdirSync(dirpath);
			}
		}
	}
	try {
		cleanSubtree();
		execSync('git subtree add -P builds/web ' + args.repo.url + '/' + args.repo.branch);
	} catch (err) {
		console.log('error happened: ' + err.message);
		if (err.message.indexOf('does not refer to a commit') !== -1) {
			execSync(`git subtree add -P builds/web HEAD --squash`);
			cleanSubtree();
		} else {
			throw new Error('Can not establish suntree');
		}
	}
	spinner.stop();
}

makeSubtree();


// try {
// 	execSync('git subtree pull -P builds/web ' + pushparam);
// } catch (err) {
// 	// console.log(err.message);
// }

execSync('npm run pack:web');

console.log('web built completed')

//build CNAME
fs.writeFileSync(path.join(dirpath, './CNAME'), "sql.chuune.cn");

execSync('git add --all -f builds/web&& git commit -m build-gitpage');


// execSync('git push ' + args.repo.url + ' master');

execSync('git subtree push -P builds/web ' + args.repo.url + ' ' + args.repo.branch);
