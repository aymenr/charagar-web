'use strict';

describe('Controller: ZakaatfundCtrl', function () {

  // load the controller's module
  beforeEach(module('charagarApp'));

  var ZakaatfundCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ZakaatfundCtrl = $controller('ZakaatfundCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ZakaatfundCtrl.awesomeThings.length).toBe(3);
  });
});
