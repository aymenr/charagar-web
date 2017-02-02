'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:MycontributionsCtrl
 * @description
 * # MycontributionsCtrl
 * Controller of the charagarApp
 */
 angular.module('charagarApp')
 .controller('MycontributionsCtrl', function (campaignService,userService,$scope) {

 	function init()
 	{
 		var userId = {
 			"userId":userService.getUserInfo().userId
 		}
 		$scope.contributionsLoaded = false;


 		campaignService.getContributionsForUser(userId)
 		.then(function(result) {

 			$scope.campaigns = result;
 			$scope.contributionsLoaded = true;
 			console.log("CONTRIBUTIONS:", $scope.campaigns)
 		})


 	}
 	$scope.getHref = function(campaign) {
 		console.log("GETTING HREF");
 		return ("#!/campaign/" + campaign._id);
 	}
 	init()

 });
