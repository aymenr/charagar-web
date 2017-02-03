'use strict';

/**
 * @ngdoc directive
 * @name charagarApp.directive:campaignFormDirective
 * @description
 * # campaignFormDirective
 */
 angular.module('charagarApp')
 .directive('campaignFormDirective', function () {
 	return {
 		templateUrl: 'scripts/directives/templates/campaignForm.html',
 		restrict: 'E',
 		scope:
 		{
 			data :"=",
 			admin:"@"

 		},
 		controller: function ($scope,campaignService,userService,ngDialog,$timeout,configConstants,$http,$q,$state)
 		{
 			function init() {

 				restrictDateInput();
 				if(!$scope.admin) {

 					$scope.campaign = {
 						"creator":"",
 						"isApproved":false,
 						"isZakaat":false,
 						"type": "Individual",
 						"amountRaised":0
 					}



 				} else {
 					$scope.campaign = $scope.data;

 				}

 				$scope.campaignTypes = ["Individual", "Cause"]
 				$scope.categoryTypes = ["Health", "Education"]


 				$scope.uploadImages = {
 					campaignImageFile: null,
 					croppedImageFile: null
 				}

 				$scope.saveStatus="";
 			}

 			init();
 			function uploadImage() {

 				var deferred = $q.defer()
 				$scope.saveStatus ="Uploading...";

 				var input =
 				$http({
 					headers: {Authorization: "Client-ID 4c8a0a606234adf"},
 					url: 'https://api.imgur.com/3/image',
 					method: 'POST',
 					data: {image: $scope.uploadImages.croppedImageFile.split(',')[1]}
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

 				$scope.campaign.creator = userService.getUserInfo().userId;
 				$scope.campaign.isApproved = false;
 				$scope.campaign.amountRaised = 0;

 				uploadImage().then(function(imageUrl) {

 					$scope.campaign.image = imageUrl;

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

 			$scope.editCampaign = function() {

 				if($scope.uploadImages.croppedImageFile) {

 					uploadImage().then(function(imageUrl) {
 						$scope.campaign.image = imageUrl;

 						var campaign = {
 							"campaignId":$scope.campaign._id,
 							"campaign": $scope.campaign
 						}
 						campaignService.editCampaign(campaign).then(function(data)
 						{


 							$timeout(function()
 							{
 								init();
 								ngDialog.open(
 								{
 									template: '<div> This campaign has been edited.</div>',
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
 									template: '<div>Oops! Unable to edit campaign.</div>',
 									plain: true
 								});
 							}, 500);
 						});

 					});

 				} else {


 					var campaign = {
 						"campaignId":$scope.campaign._id,
 						"campaign": $scope.campaign
 					}

 					campaignService.editCampaign(campaign).then(function(data)
 					{

 						$timeout(function()
 						{
 							init();
 							ngDialog.open(
 							{
 								template: '<div> This campaign has been edited.</div>',
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
 								template: '<div>Oops! Unable to edit campaign.</div>',
 								plain: true
 							});
 						}, 500);
 					});
 				}

 			}


 			$scope.deleteCampaign = function(){
 				ngDialog
 				.openConfirm(
 				{
 					template: 'views/confirmDelete.html',
 					className: 'ngdialog-theme-default',
 					scope: $scope
 				}).then(function(data)
 				{
 					var campaign = {
 						campaignId:$scope.campaign._id
 					}

 					campaignService.deleteCampaign(campaign).then(function(data)
 					{

 						$timeout(function()
 						{
 							init();
 							ngDialog.open(
 							{
 								template: '<div> This campaign has been deleted.</div>',
 								plain: true
 							});
 						}, 500);
 						$state.go("reviewCampaigns");

 					},
 					function(errorMessage)
 					{
 						$timeout(function()
 						{
 							init();
 							ngDialog.open(
 							{
 								template: '<div>Oops! Unable to delete.</div>',
 								plain: true
 							});
 						}, 500);
 					});

 				}, function(data)
 				{

 				})
 			}




 			$scope.isSaveDisabled = function () {

 				if(!$scope.uploadImages.croppedImageFile) {
 					return true;
 				}

 				if(	$scope.saveStatus=="Uploading...") {
 					return true;
 				}
 				if ($scope.signup_form.$invalid)
 				{
 					return true;
 				}
 			}

 			$scope.isEditDisabled = function () {


 				if(	$scope.saveStatus=="Uploading...") {
 					return true;
 				}

 				if ($scope.signup_form.$invalid)
 				{
 					return true;
 				}
 			}



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

 			function restrictDateInput() {
 				var today = new Date();
 				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();
				if(dd<10){
					dd='0'+dd
				}

				if(mm<10){
					mm='0'+mm
				}

				today = yyyy+'-'+mm+'-'+dd;

				document.getElementById("startdatefield").setAttribute("min", today);


				document.getElementById("enddatefield").setAttribute("min", today);



			}
			$scope.restrictEndDate = function(){
				if($scope.campaign.startDate){
				var startDate = $scope.campaign.startDate;
 				var dd = $scope.campaign.startDate.getDate();
				var mm = $scope.campaign.startDate.getMonth()+1; //January is 0!
				var yyyy = $scope.campaign.startDate.getFullYear();
				if(dd<10){
					dd='0'+dd
				}

				if(mm<10){
					mm='0'+mm
				}

				startDate = yyyy+'-'+mm+'-'+dd;

				document.getElementById("enddatefield").setAttribute("min", startDate);
				}
			}

		},
		link: function postLink(scope, element, attrs) {
        //element.html('this is the campaignDirective directive');
    }

};
});
