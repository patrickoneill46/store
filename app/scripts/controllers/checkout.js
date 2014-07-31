'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('CheckoutCtrl', function ($scope, $http) {


    Stripe.setPublishableKey('pk_test_4SFQ174nwDH7Edae2c5sFmAi');

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.number = '4242424242424242';
    $scope.cvc = '213';
    $scope.expMonth = '01';
    $scope.expYear = '2015';

    $scope.processPayment = function(e){

        //validate card against stripe
        Stripe.card.createToken($(e.target), function(status, response){

            //if stripe returns that the card is valid i.e. 200, post to server
            if(status === 200){

                $http({
                    method: 'POST',
                    url: 'checkout',
                    data: {
                        number: $scope.number,
                        cvc: $scope.cvc,
                        expMonth: $scope.expMonth,
                        expYear: $scope.expYear,
                        stripeToken: response.id
                    }
                }).success(function(data,status,headers,config){

                    $scope.processingStatus = 'processed'


                }).error(function(data,status,headers,config){

                });
            }
        });

    }
  });
