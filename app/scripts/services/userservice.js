'use strict';

/**
 * @ngdoc service
 * @name charagarApp.userService
 * @description
 * # userService
 * Service in the charagarApp.
 */
angular.module('charagarApp')
  .service('userService', function (configConstants, $cookieStore, $http,$rootScope) {
        var userInfo;
  var apiPrefix = configConstants.apiPrefix;

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

        this.signupUser = function(userData)
        {
            console.log("GONNA SIGN UP IN SERVICE WOW");

            return $http.post(apiPrefix + 'signupUser', angular.toJson(userData, true)).then(function(result)
            {
                if (!result.data.error)
                {   console.log("signup, gonna broadcast login:", result.data);
                    saveUserInfo(result.data);

                    $rootScope.$broadcast("userLogin");
                    return result.data;
                }
                else
                {
                    //error here
                    console.log("signup failed");
                }


            });
        }

        function saveUserInfo(info)
        {
            console.log("IN SAVE USER INFO:", info);
            userInfo = info;

            userInfo.isLoggedIn = true;
           $cookieStore.put('userInfo', userInfo);
                console.log("RESSSS:", $cookieStore.get('userInfo'));
            return
        }



  });
