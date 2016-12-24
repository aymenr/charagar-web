'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the charagarApp
 */
 angular.module('charagarApp')
 .controller('HeaderCtrl', function ($scope, ngDialog) {

 	init();

 	function init()
 	{
 		$scope.isLoggedIn = false;

    }


    $scope.openSignup = function()
    {
    	ngDialog.open(
        {
            template: 'views/userAuth.html',
            controller: 'UserauthCtrl',
            className: 'ngdialog-theme-default',
            showClose: true,
            closeByEscape: true,
            closeByDocument: true

        });
    }


});
