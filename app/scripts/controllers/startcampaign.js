'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:StartcampaignCtrl
 * @description
 * # StartcampaignCtrl
 * Controller of the charagarApp
 */
 angular.module('charagarApp')
 .controller('StartcampaignCtrl', function ($scope,campaignService) {

 	$scope.campaign;

 	$scope.saveCampaign = function() {



 		campaignService.saveCampaign(angular.copy($scope.campaign)).then(function(data)
 		{
 			console.log("zabardast save ho gaya campaign ")
 		},
 		function(errorMessage)
 		{
 			$scope.isError = true;
 		});
 	}








});
