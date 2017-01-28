'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:GeneralfundCtrl
 * @description
 * # GeneralfundCtrl
 * Controller of the charagarApp
 */
angular.module('charagarApp')
  .controller('GeneralfundCtrl', function (campaignService,$scope) {

       function init() {
   			campaignService.getGeneralFund().then(function(data)
 		{

 			$scope.campaign = data[0];
 			console.log($scope.campaign);
 		})
   	}

   	init()
  });
