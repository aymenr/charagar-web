'use strict';

describe('Controller: ReviewcampaignsCtrl', function () {

  // load the controller's module
  beforeEach(module('charagarApp'));

  var ReviewcampaignsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReviewcampaignsCtrl = $controller('ReviewcampaignsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReviewcampaignsCtrl.awesomeThings.length).toBe(3);
  });
});
