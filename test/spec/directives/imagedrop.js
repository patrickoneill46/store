'use strict';

describe('Directive: imageDrop', function () {

  // load the directive's module
  beforeEach(module('storeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<image-drop></image-drop>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the imageDrop directive');
  }));
});
