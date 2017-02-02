'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the charagarApp
 */
 angular.module('charagarApp')
 .controller('HeaderCtrl', function ($scope, ngDialog,userService) {

    function init() {

        $scope.isLoggedIn = userService.isLoggedIn();
        $scope.userData = userService.getUserInfo();
        console.log("userdata:",$scope.userData, " is logged:", $scope.isLoggedIn);
    }

    $scope.$watch(userService.isLoggedIn, function(isLoggedIn)
    {
        if (isLoggedIn)
        {
            $scope.userData = userService.getUserInfo();

        };
        $scope.isLoggedIn = isLoggedIn

    });

    $scope.openSignup = function()
    {
    	ngDialog.open(
        {
            template: 'views/userAuth.html',
            controller: 'UserauthCtrl',
            className: 'ngdialog-theme-default userAuth',
            showClose: true,
            closeByEscape: true,
            closeByDocument: true

        });
    }

    $scope.logoutUser = function()
    {
        userService.logoutUser();
    }

    $scope.dropdown = [

    {
        "text": "Logout",
        "click": "logoutUser()",
    },
    {
        "text": "My Campaigns",
        "click": "",
    }


    ];

    init();

});
