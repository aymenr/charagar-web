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
            admin:"@"

        },
        controller: function ($scope)
        {
        	$scope.campaignData = $scope.data;

            if(!$scope.admin) {
                $scope.admin =  false
            }

            if($scope.campaignData.name)
                $scope.campaignData.name = toTitleCase($scope.campaignData.name)
            $scope.percentageRaised = ($scope.campaignData.amountRaised/ $scope.campaignData.goal) *100;

            if(moment($scope.campaignData.endDate).isBefore(new Date())) {
                $scope.timeLeft = "Campaign Has Finished";
            } else {

             $scope.timeLeft = toTitleCase(moment($scope.campaignData.endDate).fromNow(true)) + " Left";

         }
         $scope.getHref = function() {

            return ("#!/campaign/" + $scope.campaignData._id);
        }

        $scope.getEditHref = function() {
            console.log("#!/editCampaign/"+ $scope.campaignData._id)
            return ("#!/editCampaign/" + $scope.campaignData._id);
        }

        function toTitleCase(str)
        {
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }
    },

    link: function postLink(scope, element, attrs) {
        //element.html('this is the campaignDirective directive');
    }
};
});
