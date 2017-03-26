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
 		controller: function ($scope,campaignService,userService,ngDialog,$timeout,configConstants,$http,$q,$state,$window)
 		{	
 			$scope.otherImageUploading = false;
 			function init() {
 				
 				restrictDateInput();


 				$scope.uploadImages = {

 					campaignImage: {
 						campaignImageFile:null,
 						croppedCampaignImageFile:null,
 						campaignImageUrl:null,
 					},
 					
 					userImage: {
 						userImageFile:null,
 						croppedUserImageFile:null,
 						userImageUrl:null,
 					},
 					


 					otherImages: []


 				}


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

 					populateOtherImages()

 				}

 				$scope.campaignTypes = ["Individual", "Cause"]
 				$scope.categoryTypes = ["Health", "Education"]



 				$scope.saveStatus="";
 				$scope.isSaving = false;
 			}

 			init();
 			
 			function populateOtherImages() {
 				if($scope.campaign){
 				for (var i = 0; i <$scope.campaign.otherImages.length; i++) {
 					$scope.campaign.otherImages[i].isUploading = false;

 					$scope.campaign.otherImages[i].isUploaded = true;

 					$scope.uploadImages.otherImages.push($scope.campaign.otherImages[i])
 				}
 			}
 			}

 			function uploadImages() {

 				var deferred = $q.defer()
 				$scope.saveStatus ="uploading";
 				$scope.isSaving = true;
 				var imagesArray =[];
 				var userImage = false;
 				var counter = 0;

 				if($scope.uploadImages.campaignImage.croppedCampaignImageFile)
 					imagesArray.push({'image':$scope.uploadImages.campaignImage.croppedCampaignImageFile, 'type':'campaign'});
 				
 				
 				if($scope.uploadImages.userImage.croppedUserImageFile)
 					imagesArray.push({'image':$scope.uploadImages.userImage.croppedUserImageFile, 'type':'user'});



 				$window.async.forEachSeries(imagesArray, function(imageFile, callback){
 					
 					uploadImage(imageFile.image).then(function(result) {
 						
 						if(imageFile.type== "campaign") { //its campaign image
 							$scope.uploadImages.campaignImage.campaignImageUrl = result;
 						} else if( imageFile.type="user") {
 							$scope.uploadImages.userImage.userImageUrl = result;
 							
 						} else {
 							$scope.uploadImages.otherImages.push(result);
 						}

 						counter++;
 						console.log("counter:",counter);
 						callback();

 					})

 				}, function(err){

 					if(err){
 						console.log('ERROR: ', err);
 						deferred.reject();
 						
 					}
 					else{
 						console.log("ho gaya jani");
 						deferred.resolve();
 					}


 				});

 				return deferred.promise;
 			};


 			function uploadImage (imageFile) {
 				var deferred = $q.defer();

 				$http({
 					headers: {Authorization: "Client-ID 4c8a0a606234adf"},
 					url: 'https://api.imgur.com/3/image',
 					method: 'POST',
 					data: {image: imageFile.split(',')[1]}
 				}).then(function successCallback(response) {

 						/// yahan kya karna ha?
 						console.log("resolving:",response.data.data.link);
 						deferred.resolve(response.data.data.link)

 					}, function errorCallback(err) {

 						deferred.reject(err);
 						$scope.saveStatus = "Error! Try Again";
 					});

 				return deferred.promise;
 			}

 			$scope.addDocument = function() {
 				
 				$scope.uploadImages.otherImages.push({otherImageFile:null,otherImageUrl:null,otherImageTitle:null,otherImageFileName:null,isUploading:false,isUploaded:false})
 				
 			}

 			$scope.removeDocument = function(indexNumber) {
 				$scope.uploadImages.otherImages.splice(indexNumber,1);
 			}

 			$scope.saveCampaign = function() {
 				$scope.isSaving = true;
 				$scope.campaign.creator = userService.getUserInfo().userId;
 				$scope.campaign.isApproved = false;
 				$scope.campaign.amountRaised = 0;

 				uploadImages().then(function() {

 					$scope.campaign.campaignImage = $scope.uploadImages.campaignImage.campaignImageUrl;
 					$scope.campaign.userImage = $scope.uploadImages.userImage.userImageUrl;



 					removeMetaDataFromOtherImages();
 					$scope.campaign.otherImages = $scope.uploadImages.otherImages;

 					campaignService.saveCampaign(angular.copy($scope.campaign)).then(function(data)
 					{

 						$scope.isSaving = false;
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

 			function removeMetaDataFromOtherImages () {  
 				for (var i = 0; i <$scope.uploadImages.otherImages.length;i++) {
 					
 					delete $scope.uploadImages.otherImages[i].otherImageFile;
 					delete $scope.uploadImages.otherImages[i].isUploaded;
 					delete $scope.uploadImages.otherImages[i].isUploading;

 					delete $scope.uploadImages.otherImages[i].otherImageFileName;
 				}
 			}

 			$scope.editCampaign = function() {

 				if($scope.uploadImages.campaignImage.croppedCampaignImageFile ||$scope.uploadImages.userImage.croppedUserImageFile ) {

 					uploadImages().then(function() {

 						if($scope.uploadImages.campaignImage.croppedCampaignImageFile)
 							$scope.campaign.campaignImage = $scope.uploadImages.campaignImage.campaignImageUrl;

 						if($scope.uploadImages.userImage.croppedUserImageFile)
 							$scope.campaign.userImage = $scope.uploadImages.userImage.userImageUrl;

 						
 						removeMetaDataFromOtherImages();
 						$scope.campaign.otherImages = $scope.uploadImages.otherImages;

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

 					removeMetaDataFromOtherImages();
 					$scope.campaign.otherImages = $scope.uploadImages.otherImages;

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

 				if(!$scope.uploadImages.campaignImage.croppedCampaignImageFile) {
 					console.log("a")
 					return true;
 				}

 				if(	$scope.saveStatus=="uploading") {
 					console.log("b")
 					return true;
 				}
 				if ($scope.signup_form.$invalid)
 				{
 					console.log("c")
 					return true;
 				}

 				if($scope.otherImageUploading==true) {
 					console.log("d")
 					return true;
 				}

 				for(var i = 0; i <$scope.uploadImages.otherImages.length;i++) {
 					if($scope.uploadImages.otherImages[i].isUploaded == false) {
 						return true;
 					}
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


 				if($scope.otherImageUploading==true) {
 					console.log("d")
 					return true;
 				}

 				for(var i = 0; i <$scope.uploadImages.otherImages.length;i++) {
 					if($scope.uploadImages.otherImages[i].isUploaded == false) {
 						return true;
 					}
 				}

 			}



 			$scope.onImageSelect = function($files, type)
 			{	
 				console.log("KUCH TO HO GAYA");
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

 							if(type.indexOf("otherImage") != -1) {

 								var parsedIndex = parseInt(type.substr(10,type.length));
 								
 								$scope.uploadImages['otherImages'][parsedIndex].otherImageFileName = $scope.file.name;
 								$scope.uploadImages['otherImages'][parsedIndex].otherImageFile = evt.target.result;
 								$scope.uploadImages['otherImages'][parsedIndex].isUploading = true;
 								$scope.otherImageUploading = true;
 								uploadImage($scope.uploadImages['otherImages'][parsedIndex].otherImageFile).then(function(response){
 									$scope.otherImageUploading = false;
 									$scope.uploadImages['otherImages'][parsedIndex].otherImageUrl = response;
 									$scope.uploadImages['otherImages'][parsedIndex].isUploading = false;
 									$scope.uploadImages['otherImages'][parsedIndex].isUploaded = true;
 								})

 							} else {
 								$scope.uploadImages[type][type + "File"] = evt.target.result;
 							}

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
