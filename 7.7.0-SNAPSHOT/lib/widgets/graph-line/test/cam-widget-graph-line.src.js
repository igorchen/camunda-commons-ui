'use strict';

var angular = require('camunda-bpm-sdk-js/vendor/angular'),
    fs = require('fs'),
    moment = require('moment'),
    data = {},
    graphLineDefinition = require('../cam-widget-graph-line');

require('../../../../vendor/ui-bootstrap-tpls-0.11.2-camunda');

function shiftTimestamps(json) {
  var diff = moment().valueOf() - moment(json[0].timestamp).valueOf();
  return json.map(function(item) {
    item.timestamp = moment(item.timestamp).add(diff).format('YYYY-MM-DDTHH:mm:00');
    return item;
  });
}

data.day = [
  shiftTimestamps(JSON.parse(fs.readFileSync(__dirname + '/data/day-instance-start.json'))),
  shiftTimestamps(JSON.parse(fs.readFileSync(__dirname + '/data/day-instance-end.json')))
];
data.week = [
  shiftTimestamps(JSON.parse(fs.readFileSync(__dirname + '/data/week-instance-start.json'))),
  shiftTimestamps(JSON.parse(fs.readFileSync(__dirname + '/data/week-instance-end.json')))
];
data.month = [
  shiftTimestamps(JSON.parse(fs.readFileSync(__dirname + '/data/month-instance-start.json'))),
  shiftTimestamps(JSON.parse(fs.readFileSync(__dirname + '/data/month-instance-end.json')))
];



var graphLineModule = angular.module('graph-lineModule', ['ui.bootstrap']);
graphLineModule.directive('camWidgetLoader', graphLineDefinition);

var testModule = angular.module('testModule', [graphLineModule.name]);
testModule.controller('testInteractiveController', [
  '$scope',
  function(
    $scope
  ) {
    $scope.colors = [
      'green',
      'blue'
    ];

    $scope.timespan = 'day';

    $scope.interval = 900;

    $scope.values = data[$scope.timespan];
  }]);

angular.element(document).ready(function() {
  angular.bootstrap(document.body, [testModule.name]);
});
