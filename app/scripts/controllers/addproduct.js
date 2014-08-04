'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:AddproductCtrl
 * @description
 * # AddproductCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('AddproductCtrl', ['$scope', '$location', 'adminService', function ($scope, $location,adminService) {

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
                $location.path('/admin');
            });


            //adminService.product.$add()
        };
  }]);
