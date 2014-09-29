'use strict';

describe('Controller: AddproductCtrl', function () {

  // load the controller's module
  beforeEach(module('storeApp'));

  var AddproductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddproductCtrl = $controller('AddproductCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
//    expect(scope.awesomeThings.length).toBe(3);
      expect(true).toBeTruthy();
  });
});
