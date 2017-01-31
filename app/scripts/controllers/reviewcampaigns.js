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

 		if(userService.getUserInfo().accessLevel =="admin") {

 			campaignService.getAllCampaigns()
 			.then(function(result) {
 				$scope.campaigns = result;
 			})


 		}

 	}

 	init()
 });
