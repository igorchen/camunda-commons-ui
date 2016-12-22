/* jshint node: true, unused: false */
/* global __dirname: false, describe: false, before: false, it: false, browser: false,
          element: false, expect: false, by: false, protractor: false */
'use strict';
var path = require('path');
var projectRoot = path.resolve(__dirname, '../../../../');
var pkg = require(path.join(projectRoot, 'package.json'));
var pageUrl = 'http://localhost:' + pkg.gruntConfig.connectPort +
              '/lib/widgets/graph-line/test/cam-widget-graph-line.spec.html';

var page = require('./cam-widget-graph-line.page.js');

describe.only('graph-line', function() {
  var graphLine;

  before(function() {
    browser.get(pageUrl + '#interactive-container');
  });

  describe('tada', function() {
    it('tadaaaa');
  });
});
