'use strict';
var _ = require('lodash');
var extend = _.merge;
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to dshaneg\'s ' + chalk.red('node-app') + ' generator!'
    ));

    var prompts = [{
      type: 'text',
      name: 'name',
      message: 'Your app\'s name?',
      default: this.appname
    }, {
      type: 'text',
      name: 'description',
      message: 'How about a short description of the app?'
    }, {
      type: 'text',
      name: 'gitUser',
      message: 'What\'s your git username?',
      store: true
    }, {
      type: 'text',
      name: 'authorName',
      message: 'Now your real name (first and last).',
      store: true
    }, {
      type: 'text',
      name: 'authorEmail',
      message: 'Your email address?',
      store: true
    }, {
      type: 'text',
      name: 'authorUrl',
      message: 'Finally, the url of your homepage.',
      store: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: {
    package: function () {
      const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      const pkg = extend({
        name: _.kebabCase(this.props.name),
        version: '0.0.0',
        main: 'lib/index.js',
        description: this.props.description,
        files: ['lib'],
        author: {
          name: this.props.authorName,
          email: this.props.authorEmail,
          url: this.props.authorUrl
        },
        scripts: {
          test: 'istanbul cover node_modules/mocha/bin/_mocha -- -R spec',
          lint: 'eslint .'
        },
        license: 'MIT',
        repository: `${this.props.gitUser}/${_.kebabCase(this.props.name)}`,
        bugs: {
          url: `https://github.com/${this.props.gitUser}/${_.kebabCase(this.props.name)}/issues`
        },
        homepage: `https://github.com/${this.props.gitUser}/${_.kebabCase(this.props.name)}#readme`,
        keywords: [],
        devDependencies: {}
      }, currentPkg);

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    lib: function () {
      this.fs.copy(
        this.templatePath('lib/index.js'),
        this.destinationPath('lib/index.js')
      );

      this.fs.copy(
        this.templatePath('lib/class1.js'),
        this.destinationPath('lib/class1.js')
      );
    },

    eslint: function () {
      this.fs.copy(
        this.templatePath('.eslintignore'),
        this.destinationPath('.eslintignore')
      );

      this.fs.copy(
        this.templatePath('.eslintrc.json'),
        this.destinationPath('.eslintrc.json')
      );
    },

    beautify: function () {
      this.fs.copy(
        this.templatePath('.jsbeautifyrc'),
        this.destinationPath('.jsbeautifyrc')
      );
    },

    git: function () {
      this.fs.copy(
        this.templatePath('.gitattributes'),
        this.destinationPath('.gitattributes')
      );

      // npm will not publish .gitignore, so our template leaves out the leading dot
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    markdown: function () {
      this.fs.copy(
        this.templatePath('CHANGELOG.md'),
        this.destinationPath('CHANGELOG.md')
      );

      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'), {
          projectName: this.props.name,
          description: this.props.description
        }
      );
    },

    test: function () {
      this.fs.copy(
        this.templatePath('test/class1.js'),
        this.destinationPath('test/class1.js')
      );

      this.fs.copy(
        this.templatePath('test/.eslintrc.json'),
        this.destinationPath('test/.eslintrc.json')
      );
    },

    vscode: function () {
      this.fs.copy(
        this.templatePath('.vscode/extensions.json'),
        this.destinationPath('.vscode/extensions.json')
      );

      this.fs.copy(
        this.templatePath('.vscode/settings.json'),
        this.destinationPath('.vscode/settings.json')
      );
    }
  },

  end: function () {
    this.log(yosay(
      'All done! Now go write some code!'
    ));

    this.log('You can run \'npm test\' or \'npm run lint\' now to see that everything\'s ship shape.');
  },

  installCoreDevDependencies() {
    this.npmInstall([
      'eslint',
      'mocha',
      'chai',
      'istanbul'
    ], {
      'save-dev': true
    });
  },

  installEslintPluginImport() {
    // separated to keep eslint-plugin-import from complaining about unmet peer depenencies
    this.npmInstall([
      'eslint-plugin-import'
    ], {
      'save-dev': true
    });
  },

  installAirBnbBase() {
    // separated to keep airbnb-base from complaining about unmet peer depenencies
    this.npmInstall([
      'eslint-config-airbnb-base'
    ], {
      'save-dev': true
    });
  }
});
