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

   function init() {
   			campaignService.getZakaatFund().then(function(data)
 		{

 			$scope.campaign = data[0];
 			console.log($scope.campaign);
 		})
   	}

   	init()

  });
