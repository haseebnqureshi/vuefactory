#! /usr/bin/env node

var _ = require('underscore');

var chalk = require('chalk');

var inquirer = require('inquirer');

var path = require('path');

var fs = require('fs');

var actions = require(__dirname + '/actions.js');

var package = require(path.resolve(__dirname, '../package.json'));

console.log(
	`\n` + chalk.gray(`  ===========================================`)
	+ `\n` + chalk.gray(`  `) + chalk.yellow.bold(`Vue Factory`)
	+ `\n` + chalk.gray(`  `) + chalk.cyan.bold(package.description)
	+ `\n` + chalk.gray(`  `) + chalk.gray(package.repository.url)
	+ `\n` + chalk.gray(`  `) + chalk.gray(`Version ${package.version}`)
	+ `\n`
	+ `\n` + chalk.white(`  Crafted by HQ, 2017`)
	+ `\n` + chalk.white(`  Made in Knoxville, Tennessee`)
	+ `\n` + chalk.gray(`  twitter.com/_hq`)
	+ `\n` + chalk.gray(`  github.com/haseebnqureshi`)
	+ `\n` + chalk.gray(`  ===========================================`)
	+ `\n`
	+ `\n` + chalk.yellow.bold(`  Let's get started!`)
	+ `\n` + chalk.cyan.bold(`  Answer the prompts to get going in seconds.`)
	+ `\n`
);

var questions = [];

questions.push({ 
	name: "base",
	type: "list",
	message: chalk.yellow("Which base do you want to start with?"),
	choices: actions.readdir(__dirname + '/bases'),
	filter: function(value) {
		return value.toLowerCase();
	}
});

_.each(actions.readdir(__dirname + '/extras'), function(extraName) {
	questions.push({
		name: `extra_${extraName}`,
		type: 'confirm',
		default: false,
		message: chalk.gray(` - Want ${chalk.cyan.bold(extraName)} added onto your base?`)
	});
});

inquirer.prompt(questions).then((answers) => {

	console.log(
		  `\n` + chalk.gray(`| `)
		+ `\n` + chalk.gray(`| `) + chalk.yellow.bold(`Okay...`)
		+ `\n` + chalk.gray(`| `) + chalk.gray.bold(`Working on your new Vue application...`)
		+ `\n` + chalk.gray(`| `)
	);

	// first we get our base installed
	actions.copyDir(`${__dirname}/bases/${answers.base}/*`, process.env.PWD);

	// keep track of our installed extras
	var installedExtras = {};

	// then we conditionally install any wanted extras
	_.each(answers, function(answer, key) {
		var isExtra = key.match(/^extra\_(.*)$/);
		if (isExtra && answer === true) {
			var extraName = isExtra[1];
			var dirpath = path.resolve(__dirname, 'extras', extraName);

			// continue only if we've not installed this extra
			if (_.has(installedExtras, extraName)) { return; }

			// for right now, we're handling intra extra dependencies manually, here
			// switch(extraName) {
			// 	case 'users':

			// 		// continue only if we've not installed emails
			// 		if (!_.has(installedExtras, 'emails')) { 
			// 			actions.addExtra('emails', path.resolve(__dirname, 'extras', 'emails'), process.env.PWD);
			// 			installedExtras['emails'] = true;
			// 		}
			// 		break;
			// }

			var targetpath = path.resolve(process.env.PWD, 'vue');
			actions.addExtra(extraName, dirpath, targetpath);
			installedExtras[extraName] = true;
		}
	});

	// we render our entry main file, just in case there's still any mustache templating
	actions.render(path.resolve(process.env.PWD, 'vue', 'main.js'), {});

	// and to that point, handle any potential unrendered home/component.vue vars
	actions.renderExtraOnto(path.resolve(process.env.PWD, 'vue', 'home', 'component.vue'));
	actions.renderExtraOnto(path.resolve(process.env.PWD, 'vue', 'header', 'component.vue'));
	actions.renderExtraOnto(path.resolve(process.env.PWD, 'vue', 'footer', 'component.vue'));

	// finally we top things off with a npm install
	actions.npmInstall(process.env.PWD);

	console.log(
		  `\n` + chalk.gray(`| `)
		+ `\n` + chalk.gray(`| `) + chalk.green.bold(`Success!`)
		+ `\n` + chalk.yellow(`| `) + chalk.yellow.bold(`Remember to look at your config area and fill any values needed.`)
		+ `\n` + chalk.gray(`| `) + chalk.gray.bold(`Thank you for using Vue Factory!`)
		+ `\n` + chalk.gray(`| `) + chalk.green.bold(`npm start to get going!`)
		+ `\n` + chalk.gray(`| `)
		+ `\n`
	);

});