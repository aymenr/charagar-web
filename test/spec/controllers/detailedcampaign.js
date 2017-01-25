'use strict';

describe('Controller: DetailedcampaignCtrl', function () {

  // load the controller's module
  beforeEach(module('charagarApp'));

  var DetailedcampaignCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetailedcampaignCtrl = $controller('DetailedcampaignCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DetailedcampaignCtrl.awesomeThings.length).toBe(3);
  });
});
