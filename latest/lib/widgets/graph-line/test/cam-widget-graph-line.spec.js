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

describe('graph-line', function() {
  var graphLine;

  before(function() {
    browser.get(pageUrl + '#interactive-container');
    graphLine = page.graphLine('#interactive-container');
  });


  describe('initial state', function() {
    it('hides everything', function() {
      expect(graphLine.isPresent()).to.eventually.eql(true);
      expect(graphLine.stateText()).to.eventually.eql('INITIAL');
      expect(graphLine.defaultPanel().isPresent()).to.eventually.eql(true);
      expect(graphLine.defaultPanel().isDisplayed()).to.eventually.eql(false);
    });
  });


  describe('loading state', function() {
    it('shows the icon', function() {
      graphLine.reloadButton().click(function() {
        expect(graphLine.stateText()).to.eventually.eql('LOADING');
        expect(graphLine.loadingNotice().isDisplayed()).to.eventually.eql(true);
        expect(graphLine.defaultPanel().isDisplayed()).to.eventually.eql(false);
      });
    });
  });


  describe('loaded state', function() {
    it('shows the transclusion content', function() {
      graphLine.reloadButton().click(function() {
        browser.sleep(1200).then(function() {
          expect(graphLine.stateText()).to.eventually.eql('LOADED');
          expect(graphLine.loadingNotice().isDisplayed()).to.eventually.eql(false);
          expect(graphLine.defaultPanel().isDisplayed()).to.eventually.eql(true);
        });
      });
    });
  });


  describe('loaded empty state', function() {
    it('does not show the transclusion content', function() {
      graphLine.reloadEmptyButton().click(function() {
        browser.sleep(1200).then(function() {
          expect(graphLine.stateText()).to.eventually.eql('LOADED');
          expect(graphLine.loadingNotice().isDisplayed()).to.eventually.eql(false);
          expect(graphLine.defaultPanel().isDisplayed()).to.eventually.eql(false);
        });
      });
    });
  });


  describe('error state', function() {
    it('does not show the transclusion content', function() {
      graphLine.reloadButton().click(function() {
        graphLine.failButton().then(function() {
          expect(graphLine.stateText()).to.eventually.eql('ERROR');
          expect(graphLine.loadingNotice().isDisplayed()).to.eventually.eql(false);
          expect(graphLine.defaultPanel().isDisplayed()).to.eventually.eql(false);
          expect(graphLine.errorNotice().isDisplayed()).to.eventually.eql(true);
        });
      });
    });
  });
});
