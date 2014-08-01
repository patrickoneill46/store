'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('AdminCtrl', ['$scope', 'adminService', function ($scope, adminService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        $scope.categories = [
            'Starters',
            'Main',
            'Dessert',
            'Drinks'
        ];

        $scope.addItem = function(form){

            $scope.submitted = true;



            adminService.product.add({
                name: $scope.productName,
                description: $scope.description,
                price: $scope.price,

            })


            //adminService.product.$add()
        };


  }]);
