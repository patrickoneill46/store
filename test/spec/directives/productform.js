'use strict';

describe('Directive: productForm', function () {

  // load the directive's module
  beforeEach(module('storeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<product-form></product-form>');
    element = $compile(element)(scope);
      expect(element).toBeDefined();
  }));
});
