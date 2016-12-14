'use strict';

var throttle = require('lodash').throttle;
var LineGraph = require('./../../graph/line');

module.exports = [function() {
  return {
    restrict: 'A',

    scope: {
      values: '=',
      colors: '=?',
      timespan: '=?',
      interval: '=?'
    },

    link: function($scope, $element) {
      $scope.timespan = $scope.timespan || 'day';
      $scope.interval = $scope.interval || 900;

      var container = $element[0];
      var win = container.ownerDocument.defaultView;

      var sparkline = $scope.sparkline = new LineGraph({
        width: container.clientWidth,
        height: container.clientHeight,
        lineColors: $scope.colors
      });

      $scope.$watch('values', function() {
        var cn = container.className.replace('no-data', '');
        if (!$scope.values.length || !$scope.values[0] || !$scope.values[0].length) {
          cn += ' no-data';
        }
        container.className = cn;
        sparkline.setData($scope.values, $scope.timespan, $scope.interval);
      });

      container.appendChild(sparkline.canvas);

      var resize = throttle(function() {
        sparkline.resize(container.clientWidth, Math.min(Math.max(container.clientWidth * 0.75, 180), 300)).draw();
      }, 100);

      win.addEventListener('resize', resize);

      $scope.$on('$destroy', function() {
        win.removeEventListener('resize', resize);
      });
    },

    template: '<!-- keule!! pech jehabt! -->'
  };
}];