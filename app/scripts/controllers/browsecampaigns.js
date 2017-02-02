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

 	$scope.categories = ["Health", "Education","All"]
 	$scope.selectedCategory ="All";
 	 $scope.campaignsLoaded = false;
 	function init()
 	{
 		campaignService.getCampaignsByCategory({})
 		.then(function(result) {

 			$scope.campaigns = result;
 			$scope.campaignsLoaded  = true;
 		})

 	}

 	init()
 	$scope.categoryChanged=function(){

 		var query ={};
 		if($scope.selectedCategory!="All") {
 			query = {"category": $scope.selectedCategory};
 		}
 		$scope.campaignsLoaded  = false;
		campaignService.getCampaignsByCategory(query)
 		.then(function(result) {
 			$scope.campaigns = result;
 			$scope.campaignsLoaded  = true;
 		})

 	}
 });
