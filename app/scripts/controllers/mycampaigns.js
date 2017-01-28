'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:MycampaignsCtrl
 * @description
 * # MycampaignsCtrl
 * Controller of the charagarApp
 */
angular.module('charagarApp')
  .controller('MycampaignsCtrl', function ($scope,userService,campaignService) {


   function init()
   {
 	var userId = {
 		"userId":userService.getUserInfo()._id
 	}

    campaignService.getCampaignsForUser(userId)
    .then(function(result) {
      $scope.campaigns = result;
    })


  }

  init()

  });
