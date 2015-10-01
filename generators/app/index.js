'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Wojo Frontend') + ' generator!'
    ));

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
      default: '',
      validate: function(input){
        if( input == 'Kyle Deming' ){
          return false;
        } else{
          return true;
        }
      }
    },{
      type: "list",
      name: 'type',
      message: "Choose your CMS",
      choices: [
        'ExpressionEngine',
        //'Craft',
        'Wordpress',
        'A CMS is for suckers!'
      ]
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      switch(this.props.type){
        case 'ExpressionEngine':
          this.props.sourcePath = 'public/assets/src';
          this.props.publicPath = 'public/assets/dist';
          this.props.publicAssetsUrl = '/assets';
        break;
        case 'Craft':
          this.props.sourcePath = 'assets/src';
          this.props.publicPath = 'assets/dist';
          this.props.publicAssetsUrl = '/assets/dist';
        break;
        case 'Wordpress':
          this.props.sourcePath = 'content/themes/wojo-theme/assets/src';
          this.props.publicPath = 'content/themes/wojo-theme/assets/dist';
          this.props.publicAssetsUrl = '/content/themes/wojo-theme/assets/dist';
        break;
        default:
          this.props.sourcePath = '';
          this.props.publicPath = 'dist';
          this.props.publicAssetsUrl = '';
        break;
      }
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      //package.json
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          appName: _s.slugify(this.props.appName),
          appDescription: this.props.appDescription,
          authorName: this.props.authorName,
          type: this.props.type
        }
      );

      //git ignore
      this.fs.copyTpl(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore'),
        {
          type: this.props.type
        }
      );

      //htaccess
      this.fs.copyTpl(
        this.templatePath('_htaccess'),
        this.destinationPath('.htaccess'),
        {
          type: this.props.type,
          publicPath: this.props.publicPath
        }
      );


      //gulpfile.js directory
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );

      this.fs.copyTpl(
        this.templatePath('_gulpfile.js/config/_index.js'),
        this.destinationPath('gulpfile.js/config/index.js'),
        {
          srcAssets: this.props.sourcePath,
          publicAssets: this.props.publicPath
        }
      );
      this.fs.delete(
        this.destinationPath('gulpfile.js/config/_index.js')
      )

      //bower
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        {appName: _s.slugify(this.props.appName)}
      );
      this.fs.copyTpl(
        this.templatePath('_bowerrc'),
        this.destinationPath('.bowerrc'),
        this.props
      );

      //scripts
      this.fs.copy(
        this.templatePath('_scripts/**/*'),
        this.destinationPath(this.props.sourcePath + '/scripts')
      );
      this.fs.copy(
        this.templatePath('_vendor/**/*'),
        this.destinationPath(this.props.sourcePath + '/vendor')
      );



      //Templates/Markup
      switch(this.props.type){

        case 'ExpressionEngine':
          this.fs.copy(
            this.templatePath('ee/**/*'),
            this.destinationPath('./')
          );
          this.fs.copyTpl(
            this.templatePath('_index.html'),
            this.destinationPath('public/assets/src/templates/default_site/home.group/index.html'),
            this.props
          );
        break;

        case 'Craft':

        break;

        case 'Wordpress':
          this.fs.copy(
            this.templatePath('wordpress/**/*'),
            this.destinationPath('./')
          );
        break;

        default:
          this.fs.copyTpl(
            this.templatePath('_index.html'),
            this.destinationPath('index.html'),
            this.props
          );
        break;
      }




    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {

    //Install wordpress submodule stuff
    if( this.props.type == 'Wordpress' ){
      this.spawnCommand('git', ['init']);
      this.spawnCommand('git', ['submodule', 'add', 'git://github.com/WordPress/WordPress.git', 'wp']);
      this.spawnCommand('git', ['submodule', 'update', '--remote']);
    }

    this.installDependencies();

  }
});
