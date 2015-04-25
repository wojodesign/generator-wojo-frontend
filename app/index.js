'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var BourbonNeatGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
        this.installDependencies();
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(yosay('\nWojo Design presents the fabulous Yeoman Wojo Frontend Generator!'));
      this.log(chalk.green(
        '\nOut of the box I include HTML5 Boilerplate, Bourbon, Neat, Sass, Bitters, jQuery, and a ' +
        'gulpfile.js to build your app.'
      ));
    }

    var prompts = [{
      name: 'appName',
      message: 'What\'s the name of your website?',
      default: 'Neat Website'
    },{
      name: 'appDescription',
      message: 'Short description of the project...',
      default: 'A new Neat Website'
    },{
      name: 'authorName',
      message: 'What\'s your name (the author)? (tip: don\'t say Kyle Deming)',
      default: ''
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appDescription = props.appDescription;
      this.authorName = props.authorName;
      this.shortName = this.appName.replace(/[^a-z0-9]/gi, '_').toLowerCase();

      done();
    }.bind(this));
  },

  scaffoldDirectories: function(){
    this.mkdir('assets');
    this.mkdir('assets/scripts');
    this.mkdir('assets/scss');
    this.mkdir('assets/fonts');
    this.mkdir('css');
    this.mkdir('js');
    this.mkdir('images');
  },

  app: function () {
	this.template('_index.php', 'index.php');
  this.template('_header.php', 'header.php');
  this.template('_footer.php', 'footer.php');
  this.template('_functions.php', 'functions.php');
  this.template('_loop.php', 'loop.php');
  this.template('_page.php', 'page.php');
  this.template('_style.css', 'style.css');

	this.template('_package.json', 'package.json');
	this.template('_bower.json', 'bower.json');
	this.copy('bowerrc', '.bowerrc');
	this.template('_gulpfile.js', 'gulpfile.js');

	this.copy('_main.scss', 'assets/scss/main.scss');
	this.copy('_app.js', 'assets/scripts/app.js');
	this.directory('base', 'assets/scss/base');
	this.copy('favicon.ico', 'favicon.ico');
	this.copy('htaccess', '.htaccess');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  }

});

module.exports = BourbonNeatGenerator;
