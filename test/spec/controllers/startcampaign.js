'use strict';

describe('Controller: StartcampaignCtrl', function () {

  // load the controller's module
  beforeEach(module('charagarApp'));

  var StartcampaignCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StartcampaignCtrl = $controller('StartcampaignCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StartcampaignCtrl.awesomeThings.length).toBe(3);
  });
});
