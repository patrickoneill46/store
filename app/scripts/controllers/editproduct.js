'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:EditproductCtrl
 * @description
 * # EditproductCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('EditproductCtrl', ['$scope', '$routeParams', '$location', 'adminService', 'FileUploader', function ($scope, $routeParams, $location, adminService, FileUploader) {

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
                $location.path('/admin');
            });
        };

        $scope.deleteItem = function(productId) {

            $scope.submitted = true;

            adminService.product.delete({productId: productId}, function(response, responseHeaders){

                console.log(response);
                $location.path('/admin');
            });

        };

        var uploader = $scope.uploader = new FileUploader({
            url: '/image'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
  }]);
