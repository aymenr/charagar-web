'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the charagarApp
 */
angular.module('charagarApp')
  .controller('MainCtrl', function ($scope) {

  	function init()
  	{
  		$scope.isLoggedIn = false;
  	}



  	    $scope.openSignup = function()
    {
    	console.log("SHOULD POPUP");
        // ngDialog.open(
        // {
        //     template: 'views/user/userAuth.html',
        //     controller: 'UserauthCtrl',
        //     className: 'ngdialog-theme-default userAuth',
        //     showClose: true,
        //     closeByEscape: true,
        //     closeByDocument: true

        // });
    }



  });
