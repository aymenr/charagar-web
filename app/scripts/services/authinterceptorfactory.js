'use strict';

 /**
 * @ngdoc service
 * @name charagarApp.authInterceptorFactory
 * @description
 * # authInterceptorFactory
 * Factory in the charagarApp.
 */

angular.module('charagarApp')
    .factory('authInterceptor', function($rootScope, $q, $window, $location, configConstants)
    {
        return {
            request: function(config)
            {
                console.log("factory");
                config.headers = config.headers ||
                {};
                if ($window.sessionStorage.token)
                {
                    if(config.url.indexOf("api.imgur.com") <0)
                        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;

                }
                return config;
            },
            responseError: function(rejection)
            {
                if (rejection.status === 401)
                {

                }
                return $q.reject(rejection);
            }
        };
    });
