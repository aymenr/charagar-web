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
       $scope.user.password = hashPassword($scope.user.password);
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

    udata.password = hashPassword(udata.password);
    console.log("udata:",udata);
    console.log("scope copy:,", angular.copy($scope.user) );
    userService.signupUser(udata).then(function(data)
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


function hashPassword(password)
{
    return md5(password);
}






})