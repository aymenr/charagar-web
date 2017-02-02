'use strict';

/**
 * @ngdoc directive
 * @name charagarApp.directive:campaignDirective
 * @description
 * # campaignDirective
 */
 angular.module('charagarApp')
 .directive('campaignDirective', function (campaignService,userService,ngDialog,$timeout) {
 	return {
 		templateUrl: 'scripts/directives/templates/campaign.html',
 		restrict: 'E',
 		scope:
 		{
 			data :"=",
            admin:"=",
            contributions:"=",
            mine:"="

        },
        controller: function ($scope)
        {
            console.log(">>>>>>>>>>>>>>>>>>MINE:",$scope.admin);
            $scope.campaignData = $scope.data;
            console.log("CAMPAIGN DATA:", $scope.campaignData)

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

        $scope.requestDeletion = function(){
            ngDialog
            .openConfirm(
            {
                template: 'views/confirmDelete.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            }).then(function(data)
            {
                var input = {
                    campaignId:$scope.campaignData._id,
                    userId:userService.getUserInfo().userId
                }
                console.log("INPUT is good sometimes:",input)
                campaignService.requestDeletion(input).then(function(data)
                {

                    $timeout(function()
                    {

                        ngDialog.open(
                        {
                            template: '<div> Submitted for deletion.</div>',
                            plain: true
                        });
                    }, 500);

                },
                function(errorMessage)
                {
                    $timeout(function()
                    {

                        ngDialog.open(
                        {
                            template: '<div>Oops! Unable to request deletion. Try again</div>',
                            plain: true
                        });
                    }, 500);
                });

            }, function(data)
            {

            })
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
