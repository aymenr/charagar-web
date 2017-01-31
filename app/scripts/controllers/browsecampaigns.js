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

 	function init()
 	{
 		campaignService.getCampaignsByCategory({})
 		.then(function(result) {
 			$scope.campaigns = result;
 		})

 	}

 	init()
 	$scope.categoryChanged=function(){

 		var query ={};
 		if($scope.selectedCategory!="All") {
 			query = {"category": $scope.selectedCategory};
 		}

		campaignService.getCampaignsByCategory(query)
 		.then(function(result) {
 			$scope.campaigns = result;
 		})

 	}
 });
