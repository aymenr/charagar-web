'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:StartcampaignCtrl
 * @description
 * # StartcampaignCtrl
 * Controller of the charagarApp
 */
 angular.module('charagarApp')
 .controller('StartcampaignCtrl', function ($scope,campaignService,userService,ngDialog,$timeout,configConstants,$http,$q) {

 	function init() {
 		$scope.campaign = {
 			"creator":"",
 			"isApproved":"",

 		}

 		$scope.campaignTypes = ["Individual", "Cause"]

 		$scope.uploadImages = {
 			campaignImageFile: null,
 			campaignImagePath: ""
 		}

 		$scope.saveStatus="";
 	}


 	function uploadImage() {

 		var deferred = $q.defer()
 		$scope.saveStatus ="Uploading...";

 		var input =
 		$http({
 			headers: {Authorization: "Client-ID 4c8a0a606234adf"},
 			url: 'https://api.imgur.com/3/image',
 			method: 'POST',
 			data: {image: $scope.uploadImages.campaignImageFile.split(',')[1]}
 		}).then(function successCallback(response) {

 			$scope.saveStatus ="Done";

 			deferred.resolve(response.data.data.link)

 		}, function errorCallback(err) {
 			deferred.reject(err);
 			$scope.saveStatus = "Error! Try Again";
 		});
 		return deferred.promise
 	};


 	$scope.saveCampaign = function() {


 		$scope.campaign.creator = userService.getUserInfo()._id;
 		$scope.campaign.isApproved = false;

 		uploadImage().then(function(imageUrl) {
 			console.log("image url:",imageUrl);
 			$scope.campaign.image = imageUrl;
 			console.log($scope.campaign);
 			campaignService.saveCampaign(angular.copy($scope.campaign)).then(function(data)
 			{


 				$timeout(function()
 				{
 					init();
 					ngDialog.open(
 					{
 						template: '<div>You campaign has been submitted for approval.</div>',
 						plain: true
 					});
 				}, 500);

 			},
 			function(errorMessage)
 			{
 				$timeout(function()
 				{
 					init();
 					ngDialog.open(
 					{
 						template: '<div>Oops! Unable to submit campaign.</div>',
 						plain: true
 					});
 				}, 500);
 			});

 		});

 	}



 	// $scope.isSaveDisabled = function () {
 	// 	if ($scope.signup_form.$invalid)
 	// 	{
 	// 		return true;
 	// 	}
 	// }




 	$scope.onImageSelect = function($files, type)
 	{
 		var file = $files[0];
 		$scope.file = file;
 		var reader = new FileReader();
 		reader.onload = function(evt)
 		{
 			var image = new Image();
 			image.src = reader.result;

 			image.onload = function()
 			{


 				$scope.$apply(function($scope)
 				{

 					$scope.uploadImages["campaignImageFile"] = evt.target.result;


 				});

 			}
 		};


 		reader.readAsDataURL(file);

 	}

 	init();
 });

