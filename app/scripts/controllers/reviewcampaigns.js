'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:ReviewcampaignsCtrl
 * @description
 * # ReviewcampaignsCtrl
 * Controller of the charagarApp
 */
 angular.module('charagarApp')
 .controller('ReviewcampaignsCtrl', function (campaignService,$scope,userService) {


 	function init()
 	{
 		$scope.campaignsLoaded = false;
 		if(userService.getUserInfo().accessLevel =="admin") {

 			campaignService.getAllCampaigns()
 			.then(function(result) {
 				$scope.campaigns = result;

 				$scope.campaignsLoaded = true;
 			})


 		}

 	}

 	init()
 });
