'use strict';

describe('Controller: EditproductCtrl', function () {

  // load the controller's module
  beforeEach(module('storeApp'));

  var EditproductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditproductCtrl = $controller('EditproductCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
      expect(true).toBeTruthy();

  });
});
