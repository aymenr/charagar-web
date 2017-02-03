'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the charagarApp
 */
 angular.module('charagarApp')
 .controller('MainCtrl', function ($scope,campaignService) {


  $scope.liveCampaignsLoaded = false;
  $scope.pastCampaignsLoaded = false;
  function init()
  {

    campaignService.getLiveCampaigns()
    .then(function(result) {
      $scope.liveCampaigns = result;

      if($scope.liveCampaigns.length!=0){

       $scope.liveCampaignsLoaded = true;
     }

   })

    campaignService.getPastCampaigns()
    .then(function(result) {
      $scope.pastCampaigns = result;

      if($scope.pastCampaigns.length!=0){
        $scope.pastCampaignsLoaded = true;
      }

    })


  }

  init();
});
