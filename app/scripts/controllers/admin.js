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
        $scope.newProduct = {};

        $scope.categories = [
            'Starters',
            'Main',
            'Dessert',
            'Drinks'
        ];

        $scope.addItem = function(form){

            $scope.submitted = true;
            console.log('adding item...');

            if(form.$invalid){
                return;
            }

            adminService.product.add($scope.newProduct, function(response, responseHeaders){

                console.log(response);

            });


            //adminService.product.$add()
        };

        $scope.products = adminService.product.query();


  }]);
