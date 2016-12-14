'use strict';

var angular = require('camunda-bpm-sdk-js/vendor/angular'),
    graphLineDefinition = require('../cam-widget-graph-line');

require('../../../../vendor/ui-bootstrap-tpls-0.11.2-camunda');

var graphLineModule = angular.module('graph-lineModule', ['ui.bootstrap']);
graphLineModule.directive('camWidgetLoader', graphLineDefinition);

var testModule = angular.module('testModule', [graphLineModule.name]);
testModule.controller('testInteractiveController', [
  '$scope',
  function(
    $scope
  ) {
    $scope.data = [];
  }]);

angular.element(document).ready(function() {
  angular.bootstrap(document.body, [testModule.name]);
});
