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
  'ngDialog',
  'angular-lodash',
  'ui.router'

  ])
 .config(function($stateProvider, $urlRouterProvider, $httpProvider)
 {
   $urlRouterProvider.otherwise("/home");

   $stateProvider
   .state('home',
   {
    url: "/home",
    templateUrl: "views/main.html",
    controller: "MainCtrl"
  }).state('about',
  {
    url: "/about",
    templateUrl: "views/about.html",
    controller: "AboutCtrl"
  }).state('startCampaign',
  {
    url: "/startCampaign",
    templateUrl: "views/startCampaign.html",
    controller: "StartcampaignCtrl"
  }).state('detailedCampaign',
  {
    url:"/campaign/:campaignId",
    templateUrl:"views/detailedCampaign.html",
    controller: "DetailedcampaignCtrl"
  })

})
