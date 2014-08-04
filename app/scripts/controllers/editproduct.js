'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:EditproductCtrl
 * @description
 * # EditproductCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('EditproductCtrl', ['$scope', '$routeParams', 'adminService',  function ($scope, $routeParams, adminService) {

        $scope.editProduct = {};
        $scope.categories = [
            'Starters',
            'Main',
            'Dessert',
            'Drinks'
        ];

        if($routeParams.productId){
            adminService.product.get({productId: $routeParams.productId}, function(response){

                $scope.editProduct = response;
            });
        }

        $scope.updateItem = function(form){


            $scope.submitted = true;
            console.log('updating item...');

            if(form.$invalid){
                return;
            }

            adminService.product.update($scope.editProduct, function(response, responseHeaders){

                console.log(response);
            });
        };

  }]);
