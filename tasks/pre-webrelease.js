var fs = require('fs');
var path = require('path');
var { exec, execSync } = require('child_process');
var os = require('os');
var ora = require('ora');


let dirpath = path.join(__dirname, '../builds/web');
function makeSubtree() {
	if (!fs.existsSync(dirpath)) {
		fs.mkdirSync(dirpath);
	}

	if (!fs.existsSync(path.join(__dirname, './dont-delete'))) {
		let spinner = ora(`Doing some preparation work ...`).start();

		try {
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

			if (fs.readdirSync(dirpath).length > 1) {
				execSync(os.platform() === 'win32' ? `rd /q/s ${dirpath}` : `rm -rf ${dirpath}`);
				fs.mkdirSync(dirpath);
				execSync(`git add . && git commit -m "clean workspace for add subtree"`);
			}

			execSync('git subtree add -P builds/web ' +  args.repo.url + ' HEAD:' + args.repo.branch).stdout.pipe(process.stdout);
		} catch (err) {
			console.log(err);
		}
		fs.writeFileSync(path.join(__dirname, './dont-delete'), "Just check subtree status. Please do not delete.");
		spinner.stop();
		
	} else {
		return true;
	}
}


makeSubtree();

//build CNAME
fs.writeFileSync(path.join(dirpath, './CNAME'), "sql.chuune.cn");
