'use strict';

/**
 * @ngdoc directive
 * @name charagarApp.directive:campaignDisplayDirective
 * @description
 * # campaignDisplayDirective
 */
 angular.module('charagarApp')
 .directive('campaignDisplay', function () {
 	return {
 		templateUrl: 'scripts/directives/templates/campaignDisplay.html',
 		restrict: 'E',
 		scope:
 		{
 			data :"=",
 			name:"@",
 			contributions:"@",
 			mine:"@",
 			admin:"@"

 		},controller: function ($scope)
        {
        	console.log("HEREEEEEE:",$scope.mine);
        	$scope.campaigns = $scope.data;
        },
 		link: function postLink(scope, element, attrs) {

 		}
 	};
 });
