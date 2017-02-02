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
      $scope.liveCampaignsLoaded = true;
    })

    campaignService.getPastCampaigns()
    .then(function(result) {
      $scope.pastCampaigns = result;
      $scope.pastCampaignsLoaded = true;
    })


  }

  init();
});
