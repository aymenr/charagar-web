'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:BrowsecampaignsCtrl
 * @description
 * # BrowsecampaignsCtrl
 * Controller of the charagarApp
 */
 angular.module('charagarApp')
 .controller('BrowsecampaignsCtrl', function (campaignService,$scope) {

 	$scope.categories = ["health", "education","all"]
 	$scope.selectedCategory ="all";

 	function init()
 	{
 		campaignService.getCampaignsByCategory({})
 		.then(function(result) {
 			$scope.campaigns = result;
 		})

 	}

 	init()
 	$scope.categoryChanged=function(){
 		console.log("CHANGE");
		campaignService.getCampaignsByCategory({"category":$scope.selectedCategory})
 		.then(function(result) {
 			$scope.campaigns = result;
 		})

 	}
 });
