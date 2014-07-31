'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('MenuCtrl', ['cartService', '$scope', function (cartService, $scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     $scope.items = [
         {
             name: 'Item A',
             price: 100,
             key: 'itema'
         },
         {
             name: 'Item B',
             price: 200,
             key: 'itemb'
         }
     ];

     $scope.addItem = function(item) {

         cartService.addItem(item, 1);

     };

     $scope.incrementItem = function(item){
         cartService.incrementItem(item.key, 1);
     };

     $scope.decrementItem = function(item){
         cartService.decrementItem(item.key, 1);
     };

     $scope.removeItem = function(item){

         cartService.removeItem(item);
     };
  }]);
