'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:UserauthCtrl
 * @description
 * # UserauthCtrl
 * Controller of the charagarApp
 */
 angular.module('charagarApp')
 .controller('UserauthCtrl', function ($scope,userService) {

 		$scope.isError = false;

        $scope.loginUser = function()
        {
        	console.log("LOGIN USER,", $scope.user);
            $scope.isError = false;
            userService.loginUser(angular.copy($scope.user)).then(function(data)
                {
                	$state.go("/#!");
                	console.log("HO GAYA LOGIN WOW");
                    //$scope.go("/home/dashboard");
                },
                function(errorMessage)
                {
                    $scope.isError = true;
                });
        }




 });
