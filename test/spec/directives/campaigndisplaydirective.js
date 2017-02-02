'use strict';

describe('Directive: campaignDisplayDirective', function () {

  // load the directive's module
  beforeEach(module('charagarApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<campaign-display-directive></campaign-display-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the campaignDisplayDirective directive');
  }));
});
