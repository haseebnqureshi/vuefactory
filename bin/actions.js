'use strict';

var exec = require('child_process').execSync;

var fs = require('fs');

var _ = require('underscore');

var mustache = require('mustache');

module.exports = {

	addExtra: function(name, from, to) {

		//copy our extra to desired location
		exec(`cp -r ${from} ${to}`, { stdio: [] });

		//then render our copied extra and add hooks to main entry file
		this.renderExtra(name, from, to);

		//adding some needed deps
		exec(`bash ${to}/${name}/install.sh`, { stdio: [] });

		//cleaning up
		exec(`rm ${to}/${name}/install.sh`, { stdio: [] });
		exec(`rm ${to}/${name}/install.json`, { stdio: [] });
	},

	copyDir: function(from, to) {
		return exec(`cp -r ${from} ${to}`, {
			stdio: []
		});
	},

	npmInstall: function(dirpath) {
		return exec(`cd ${dirpath} && npm install`, {
			stdio: []
		});
	},

	readdir: function(dirpath) {
		return _.filter(fs.readdirSync(dirpath), function(filename) {
			return !filename.match(/^\./);
		});
	},

	render: function(filepath, data) {
		var template = fs.readFileSync(filepath, 'utf8');
		var data = data || {};
		var rendered = mustache.render(template, data);
		return fs.writeFileSync(filepath, rendered, 'utf8');
	},

	renderExtra: function(name, from, to) {

		//adding our necessary main entry file hooks for our extra
		var filepath = `${to}/index.js`;
		var data = require(`${to}/${name}/install.json`);
		return this.render(filepath, data);
	}

};
