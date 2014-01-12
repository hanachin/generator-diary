'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var DiaryGenerator = module.exports = function DiaryGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DiaryGenerator, yeoman.generators.Base);

DiaryGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'diaryFileName',
      message: '今日のブログのファイル名は何にする?',
      default: function () {
        var d     = new Date();
        var year  = d.getFullYear();
        var month = d.getMonth() + 1;
        var date  = d.getDate();
        if (month < 10) { month = "0" + month; }
        if (date < 10)  { date  = "0" + date; }
        return '' + year + month + date + '.md';
      }
    }
  ];

  this.prompt(prompts, function (props) {
    this.diaryFileName = props.diaryFileName;

    cb();
  }.bind(this));
};

DiaryGenerator.prototype.app = function app() {
  this.mkdir('diary');
  this.copy('empty', 'diary/' + this.diaryFileName);
};

DiaryGenerator.prototype.projectfiles = function projectfiles() {
};
