var Generator = require('yeoman-generator');
const _extend = require("lodash/extend")
_extend(Generator.prototype, require('yeoman-generator/lib/actions/install'))

module.exports = class extends Generator {
  options = {
    appName: 'quiz',
  }
  async prompting() {
    this.options = await this.prompt([
      {
        type: "input",
        name: "appName",
        message: "Your project name",
        default: this.options.appName
      },
    ]);
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationRoot(this.options.appName),
      { options: this.options },
      {},
      { globOptions: { ignore: ['**/coverage/**', '**/node_modules/**']} },
    );
  }
  install() {
    this.installDependencies({
      npm: true,
    });
  }
};
