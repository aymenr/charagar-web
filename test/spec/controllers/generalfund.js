'use strict';

describe('Controller: GeneralfundCtrl', function () {

  // load the controller's module
  beforeEach(module('charagarApp'));

  var GeneralfundCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GeneralfundCtrl = $controller('GeneralfundCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GeneralfundCtrl.awesomeThings.length).toBe(3);
  });
});
