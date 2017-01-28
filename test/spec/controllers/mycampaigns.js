'use strict';

describe('Controller: MycampaignsCtrl', function () {

  // load the controller's module
  beforeEach(module('charagarApp'));

  var MycampaignsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MycampaignsCtrl = $controller('MycampaignsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MycampaignsCtrl.awesomeThings.length).toBe(3);
  });
});
