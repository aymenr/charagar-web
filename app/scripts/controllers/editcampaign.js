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
 	$scope.canAccess=true;
 	$scope.loaded = false;
 	function init() {

 		if(userService.getUserPermissions()=="admin"){
 			$scope.loadCampaignDetail();
 		} else {
 			$scope.canAccess = false;
 		}
 	}



 	$scope.loadCampaignDetail = function()
 	{

 		campaignService.getCampaign(campaignId).then(function(data)
 		{
 			$scope.campaign = data[0];
 			$scope.campaign.startDate = new Date($scope.campaign.startDate);
 			$scope.campaign.endDate = new Date($scope.campaign.endDate);

 			$scope.loaded=true;

 		},
 		function(errorMessage)
 		{
            //error handling goes here
        });
 	}

 	init();

 });
