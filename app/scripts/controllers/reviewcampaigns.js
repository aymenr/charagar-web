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
 		if(userService.getUserInfo().accessLevel ==10) {
 			campaignService.getAllCampaigns()
 			.then(function(result) {
 				$scope.campaigns = result;
 			})


 		}

 	}
 	$scope.getHref = function(campaign) {
 		console.log("#!/editCampaign/"+ campaign._id)
 		return ("#!/editCampaign/" + campaign._id);
 	}
 	init()
 });
