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
 	var videoId ="error";
 	function init()
 	{

 		$scope.campaign;
 		$scope.percentageRaised;

 		$scope.canLoadVideo = false;
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
 			console.log("CAMPAIN:",$scope.campaign);
 			if($scope.campaign.video)
 				videoId = getVideoId($scope.campaign.video);

 			if(videoId != "error") {

 				$scope.canLoadVideo = true;
 				$('#videoPlayer').html('<iframe class="video" width="560" height="315" src="//www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>');
 			}
 		},
 		function(errorMessage)
 		{
                    //error handling goes here
                });
 	}

 	function getVideoId(url) {
 		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
 		var match = url.match(regExp);

 		if (match && match[2].length == 11) {

 			return match[2];
 		} else {
 			return 'error';
 		}
 	}
 	init();
 });
