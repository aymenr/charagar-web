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
    'ui.router',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngDialog'

  ])
  .config(function ($stateProvider) {

    $stateProvider
      .state('about',
        {
            url: "/about",
            templateUrl: "views/about.html",
            controller: "AboutCtrl"
        })

  });
