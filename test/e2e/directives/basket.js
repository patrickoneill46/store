describe('Basket directive', function(){

    var basketButtonElement = element(by.css('.basketWrapper button')),
        basketContainer = element(by.css('.basketContainer'));

    beforeEach(function(){
        browser.get('http://localhost:9000/#');
    });

    it('should show and hide the basket when button clicked', function(){
        expect(basketContainer.isDisplayed()).toBeFalsy();
        basketButtonElement.click();
        expect(basketContainer.isDisplayed()).toBeTruthy();
        basketButtonElement.click();
        expect(basketContainer.isDisplayed()).toBeFalsy();
    });

});