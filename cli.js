#!/usr/bin/env node
'use strict';

var _meow = require('meow');

var _meow2 = _interopRequireDefault(_meow);

var _isOnline = require('is-online');

var _isOnline2 = _interopRequireDefault(_isOnline);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cli = (0, _meow2.default)('\n  Usage\n    $ nofi [flag] [npm-package]\n\n  Options\n    --save, -S\n    --save-dev, -D\n    --save-optional, -O\n\n  Examples\n    $ nofi -D some-npm-package\n', {
  alias: {
    S: 'save',
    D: 'save-dev',
    O: 'save-optional'
  }
});

var flagger = function flagger() {
  if (cli.flags.save) return '--save ' + cli.flags.save;
  if (cli.flags.saveDev) return '--save-dev ' + cli.flags.saveDev;
  if (cli.flags.saveOptional) return '--save-optional ' + cli.flags.saveOptional;
};

var otherPkgs = function otherPkgs() {
  if (cli.input) return ' ' + cli.input.join(' ');
};

(0, _isOnline2.default)(function (err, yup) {
  if (err) throw err;

  if (yup) {
    console.log(_chalk2.default.bold.green('Online.') + ' nofi will attempt to force an install from the internet. Ignore npm\'s cryptic warning.');
    _child_process2.default.execSync('npm install --force ' + flagger() + otherPkgs());
  } else {
    console.log(_chalk2.default.bold.red('Not online.') + ' nofi will attempt to install from cache, but can\'t guarantee you have this package.');
    _child_process2.default.execSync('npm install --cache-min Infinity ' + flagger() + otherPkgs());
  }
});
