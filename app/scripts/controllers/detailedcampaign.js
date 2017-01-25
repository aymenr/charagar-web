'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:DetailedcampaignCtrl
 * @description
 * # DetailedcampaignCtrl
 * Controller of the charagarApp
 */
 angular.module('charagarApp')
 .controller('DetailedcampaignCtrl', function ($scope,$stateParams,campaignService) {
 	var campaignId = $stateParams.campaignId;

 	$scope.campaign;
 	$scope.percentageRaised;
 	function init()
 	{
 		$scope.loadCampaignDetail();
 	}


 	$scope.loadCampaignDetail = function()
 	{

 		campaignService.getCampaign(campaignId).then(function(data)
 		{

 			$scope.campaign = data[0];
 			$scope.percentageRaised = ($scope.campaign.amountRaised/ $scope.campaign.goal )* 100
 			$scope.timeLeft = moment($scope.campaign.endDate).fromNow(true);
 			$scope.isLive = moment(new Date()).isBefore (moment($scope.campaign.endDate));
 		},
 		function(errorMessage)
 		{
                    //error handling goes here
                });
 	}
 	init();
 });
