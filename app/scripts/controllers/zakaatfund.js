'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:ZakaatfundCtrl
 * @description
 * # ZakaatfundCtrl
 * Controller of the charagarApp
 */
 angular.module('charagarApp')
 .controller('ZakaatfundCtrl', function ($scope,campaignService) {

 	var videoId ="";
 	$scope.canLoadVideo = false;
 	function init() {
 		campaignService.getZakaatFund().then(function(data)
 		{

 			$scope.campaign = data[0];

 			videoId = getVideoId($scope.campaign.video);

 			if(videoId != "error") {

 				$scope.canLoadVideo = true;

 				$('#videoPlayer').html('<iframe class="video" width="560" height="315" src="//www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>');
 			}
 		})

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



 	init()

 });
