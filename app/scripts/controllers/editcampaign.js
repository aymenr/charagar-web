'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:EditcampaignCtrl
 * @description
 * # EditcampaignCtrl
 * Controller of the charagarApp
 */
 angular.module('charagarApp')
 .controller('EditcampaignCtrl', function (campaignService,$stateParams,$scope,$timeout,ngDialog,userService) {
 	$scope.campaign = null;
 	var campaignId = $stateParams.campaignId;

 	function init()
 	{	if(userService.getUserInfo().accessLevel ==10) {
 		$scope.loadCampaignDetail();
 	}
 	}
 	$scope.campaignTypes = ["Individual", "Cause"]


 	$scope.loadCampaignDetail = function()
 	{

 		campaignService.getCampaign(campaignId).then(function(data)
 		{

 			$scope.campaign = data[0];
 			$scope.campaign.startDate = new Date($scope.campaign.startDate);

 			$scope.campaign.endDate = new Date($scope.campaign.endDate);
 			console.log($scope.campaign);
 		},
 		function(errorMessage)
 		{
                    //error handling goes here
                });
 	}

 	$scope.editCampaign = function()
 	{
 		var input = {
 			"campaign": $scope.campaign,
 			"campaignId": campaignId
 		}
 		campaignService.editCampaign(input).then(function(data){

 			$timeout(function()
 			{
 				init();
 				ngDialog.open(
 				{
 					template: '<div>You campaign has been edit.</div>',
 					plain: true
 				});
 			}, 500);
 		},
 		function(err) {
 				$timeout(function()
 			{
 				init();
 				ngDialog.open(
 				{
 					template: '<div>Oops! Unable to edit campaign.</div>',
 					plain: true
 				});
 			}, 500);
 		})
 	}


 	init()
 });
