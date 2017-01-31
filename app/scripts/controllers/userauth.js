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
   $scope.state = {};
   $scope.user = {};


   $scope.loginUser = function()
   {
     $scope.isError = false;
     $scope.state.isLoading = true;

     userService.loginUser(angular.copy($scope.user)).then(function(data)
     {
       $scope.closeThisDialog();
       $scope.state.isLoading = false;
     },
     function(result)
     {
      $scope.isError = true;
      console.log("ERROR:",result)
      $scope.state.isLoading = false;
      $scope.state.errorMsg = result.data.error_body;
    });
   }


   $scope.switchView = function(isSignup)
   {
      resetData(isSignup);
  }

  $scope.signupUser = function(type)
  {

    $scope.isError = false;
    $scope.isLoading = true;
    userService.signupUser(angular.copy($scope.user)).then(function(data)
    {
      $scope.isLoading = false;
      $scope.closeThisDialog();

    },
    function(result)
    {
      $scope.state.isLoading = false;
      $scope.state.errorMsg = result.data.error_body;
      $scope.isError = true;
    });


  }

  function resetData(isSignup)
  {
    $scope.state = {
      isSignup: isSignup,
      errorMsg: "",
      isSubmitting: false,
      isLoading: false
    };
    $scope.userData = {
      username: "",
      email: "",
      password: ""
    };

  }

})