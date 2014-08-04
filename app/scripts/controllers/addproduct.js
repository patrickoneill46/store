'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:AddproductCtrl
 * @description
 * # AddproductCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('AddproductCtrl', ['$scope', 'adminService', function ($scope, adminService) {

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
  }]);
