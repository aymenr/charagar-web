'use strict';

describe('Controller: EditcampaignCtrl', function () {

  // load the controller's module
  beforeEach(module('charagarApp'));

  var EditcampaignCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditcampaignCtrl = $controller('EditcampaignCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditcampaignCtrl.awesomeThings.length).toBe(3);
  });
});
