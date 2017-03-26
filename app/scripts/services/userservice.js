'use strict';

/**
 * @ngdoc service
 * @name charagarApp.userService
 * @description
 * # userService
 * Service in the charagarApp.
 */
 angular.module('charagarApp')
 .service('userService', function (configConstants, $http,$rootScope,$window) {

    var userData;
    var apiPrefix = configConstants.apiPrefix;
    var authorizedApiPrefix = configConstants.authorizedApiPrefix;





    this.loginUser = function(user)
    {

        user.password = hashPassword(user.password)


        var that = this;

        return $http.post(apiPrefix + 'loginUser/', user).then(function(result)
        {
            $window.sessionStorage.token = result.data.token;
            that.getUserInfoDataFromToken(result.data.token);
            $window.sessionStorage.isLoggedIn = true;
            return result.data;

        });
    }

    this.getUserInfoDataFromToken = function(token)
    {
        var encodedProfile = token.split('.')[1];
        var info = JSON.parse(url_base64_decode(encodedProfile));

        var userData = {
            email : info.email,
            userId : info._id,
            name : info.name,
            accessLevel : info.accessLevel
        }
        $window.sessionStorage.userData = angular.toJson(userData);
    }

    this.doesTokenExist = function()
    {
        if ($window.sessionStorage.token)
            return true;
        else
            return false;
    }

    this.isLoggedIn = function(){

            if(!$window.sessionStorage.isLoggedIn) {

                return "false"
            } else {

            return  $window.sessionStorage.isLoggedIn;
        }
    }


    this.logoutUser = function()
    {

        $window.sessionStorage.isLoggedIn = false;
        $window.sessionStorage.userData =null;
        delete $window.sessionStorage.token;
    }

    this.getUserInfo = function()
    {
        if($window.sessionStorage.userData) {
        return JSON.parse($window.sessionStorage.userData);
        } else {
            return;
        }
    }

    this.getUserPermissions = function()
    {
        return JSON.parse($window.sessionStorage.userData).accessLevel
    }


    this.signupUser = function(userData)
    {
        var unhashedPassword = userData.password;
        userData.accessLevel = "user";
        userData.password = hashPassword(userData.password)
        var that = this;
        return $http.post(apiPrefix + 'signupUser',userData).then(function(result)
        {
            var user = {
                email:userData.email,
                password:unhashedPassword
            }
            that.loginUser(user);
        });
    }


    this.verifyToken = function()
    {

        var that = this;
        return $http.get(authorizedApiPrefix+ 'verifyToken').then(function(result)
        {

            return;
        });
    }




    function url_base64_decode(str)
    {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4)
        {
            case 0:
            break;
            case 2:
            output += '==';
            break;
            case 3:
            output += '=';
            break;
            default:
            throw 'Illegal base64url string!';
        }
        return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
    }

    function hashPassword(password)
    {

        return md5(password);
    }
});
