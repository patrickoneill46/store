'use strict';

describe('Service: cartService', function () {

  // load the service's module
  beforeEach(module('storeApp'));

  // instantiate service
  var cartService,
      scope,
      firstItem = {
        _id: 'firstKey',
        price: 100,
        productName: 'Test product',
        category: 'Starter'
      },
      secondItem = {
          _id: 'secondKey',
          price: 101,
          productName: 'Test product',
          category: 'Main'
      };

  beforeEach(inject(function ($injector, _cartService_) {
    cartService = _cartService_;
      scope = $injector.get('$rootScope');
  }));


    it('should expose the correct set of public methods', function(){

        expect(typeof cartService.addItem).toBe('function');
        expect(typeof cartService.removeItem).toBe('function');
        expect(typeof cartService.incrementItem).toBe('function');
        expect(typeof cartService.decrementItem).toBe('function');
    });

    it('should add and remove the basket to the root scope', function(){

        cartService.addItem(firstItem);
        cartService.addItem(secondItem, 3);

        expect(scope.cartContents[firstItem._id].quantity).toBe(1);
        expect(scope.cartContents[secondItem._id].quantity).toBe(3);

        cartService.addItem(secondItem);
        expect(scope.cartContents[secondItem._id].quantity).toBe(4);

        cartService.decrementItem(firstItem._id);
        expect(scope.cartContents[firstItem._id]).toBeNull();

        cartService.decrementItem(secondItem._id);
        expect(scope.cartContents[secondItem._id].quantity).toBe(3);

        cartService.incrementItem(secondItem._id, 2);
        expect(scope.cartContents[secondItem._id].quantity).toBe(5);
    });

});
