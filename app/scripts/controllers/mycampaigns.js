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
    $scope.campaignsLoaded = false;
    var userId = {
     "userId":userService.getUserInfo().userId
   }
   console.log("useSERVICE IFNO:",userService.getUserInfo());
   campaignService.getCampaignsForUser(userId)
   .then(function(result) {
    $scope.campaigns = result;
    $scope.campaignsLoaded = true;
  })


 }

 init()

});
