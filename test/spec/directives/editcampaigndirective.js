'use strict';

describe('Directive: editCampaignDirective', function () {

  // load the directive's module
  beforeEach(module('charagarApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<edit-campaign-directive></edit-campaign-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the editCampaignDirective directive');
  }));
});
