'use strict';

/**
 * @ngdoc overview
 * @name charagarApp
 * @description
 * # charagarApp
 *
 * Main module of the application.
 */
 angular
 .module('charagarApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngDialog'

  ])
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
,        controllerAs: 'about'
      })
       .when('/startCampaign', {
        templateUrl: 'views/startCampaign.html',
        controller: 'StartcampaignCtrl',
        controllerAs: 'startCampaign'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
  });
