'use strict';

/**
 * @ngdoc function
 * @name charagarApp.controller:UserauthCtrl
 * @description
 * # UserauthCtrl
 * Controller of the charagarApp
 */
 angular.module('charagarApp')
 .controller('UserauthCtrl', function ($scope,userService,ngDialog) {

   $scope.isError = false;
   $scope.state = "login";
   $scope.loginUser = function()
   {
     console.log("LOGIN USER,", $scope.user);
     $scope.isError = false;
     userService.loginUser(angular.copy($scope.user)).then(function(data)
     {
                	//$.go("/#!");
                 $scope.closeThisDialog();
                 console.log("HO GAYA LOGIN WOW");
                    //$scope.go("/home/dashboard");
                },
                function(errorMessage)
                {
                    $scope.isError = true;
                });
 }


 $scope.switchView = function(isSignup)
 {
    if(isSignup) {
        console.log("switch to signup");
        $scope.state ="signup";
    } else {
        $scope.state="login";
    }
}

$scope.signupUser = function(type)
{
    console.log("Going to sign up");
    $scope.isError = false;
    var udata = angular.copy($scope.user);
    console.log("copied u data:", udata);

    userService.signupUser(angular.copy($scope.user)).then(function(data)
    {
        console.log("SIGNUPED");
        $scope.closeThisDialog();
        console.log("HO GAYA signup");
                    //$scope.go("/home/dashboard");
                },
                function(errorMessage)
                {
                    $scope.isError = true;
                });


};

})