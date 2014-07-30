'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('MenuCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
