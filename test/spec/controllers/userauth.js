'use strict';

describe('Controller: UserauthCtrl', function () {

  // load the controller's module
  beforeEach(module('charagarApp'));

  var UserauthCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserauthCtrl = $controller('UserauthCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserauthCtrl.awesomeThings.length).toBe(3);
  });
});
