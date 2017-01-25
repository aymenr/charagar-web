'use strict';

/**
 * @ngdoc directive
 * @name charagarApp.directive:campaignDirective
 * @description
 * # campaignDirective
 */
 angular.module('charagarApp')
 .directive('campaignDirective', function () {
 	return {
 		templateUrl: 'scripts/directives/templates/campaign.html',
 		restrict: 'E',
 		scope:
 		{
 			data :"=",
 			live: "@"
        },
        controller: function ($scope)
        {
        	$scope.campaignData = $scope.data;
        	$scope.percentageRaised = ($scope.campaignData.amountRaised/ $scope.campaignData.goal) *100;


        	$scope.timeLeft = moment($scope.campaignData.endDate).fromNow(true);

            $scope.getHref = function() {
                console.log("GETTING HREF");
                return ("#!/campaign/" + $scope.campaignData._id);
            }
        },

        link: function postLink(scope, element, attrs) {
        //element.html('this is the campaignDirective directive');
    }
};
});
