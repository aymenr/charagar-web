'use strict';

describe('Controller: BrowsecampaignsCtrl', function () {

  // load the controller's module
  beforeEach(module('charagarApp'));

  var BrowsecampaignsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BrowsecampaignsCtrl = $controller('BrowsecampaignsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BrowsecampaignsCtrl.awesomeThings.length).toBe(3);
  });
});
