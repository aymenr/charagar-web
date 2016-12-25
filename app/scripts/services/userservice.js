'use strict';

/**
 * @ngdoc service
 * @name charagarApp.userService
 * @description
 * # userService
 * Service in the charagarApp.
 */
angular.module('charagarApp')
  .service('userService', function (configConstants, $cookieStore, $http) {


        var apiPrefix = configConstants.apiPrefix;
        var userInfo;

        function init()
        {
            var cookieInfo = $cookieStore.get('userInfo')
            if (cookieInfo)
            {
                userInfo = cookieInfo;
            }
            console.log("COOKIE:", userInfo);
        }
        init();
        this.loginUser = function(user)
        {
        	console.log("USER", user);
            return $http.post(apiPrefix + 'loginUser/', user).then(function(result)
            {
                var userData = result.data;
                userInfo = userData;
                $cookieStore.put('userInfo', userData);
                console.log("RESSSS:", $cookieStore.get('userInfo'));
                return result.data;

            });
        }
        this.getUserInfo = function()
        {
            return userInfo;
        }
        this.isLoggedIn = function()
        {

            if (userInfo)
                return true;
            else
                return false;
        }
        this.logoutUser = function()
        {
            userInfo = null;
            $cookieStore.remove('userInfo')
        }


  });
