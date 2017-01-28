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
  'ui.router',
  'ngFileUpload',
  'ngImgur'

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
  }).state('general',
  {
    url:"/general",
    templateUrl:"views/general.html",
    controller: "GeneralCtrl"
  }).state('generalZakaatFund',
  {
    url:"/generalZakaatFund",
    templateUrl:"views/zakaatFund.html",
    controller: "ZakaatfundCtrl"
  }).state('generalFund',
  {
    url:"/generalFund",
    templateUrl:"views/generalFund.html",
    controller: "GeneralfundCtrl"
  }).state('myContributions',
  {
    url:"/myContributions",
    templateUrl:"views/myContributions.html",
    controller: "MycontributionsCtrl"
  }).state('myCampaigns',
  {
    url:"/myCampaigns",
    templateUrl:"views/myCampaigns.html",
    controller: "MycampaignsCtrl"
  }).state('editCampaign',
  {
    url:"/editCampaign/:campaignId",
    templateUrl:"views/editCampaign.html",
    controller: "EditcampaignCtrl"
  }).state('reviewCampaigns',
  {
    url:"/reviewCampaigns",
    templateUrl:"views/reviewCampaigns.html",
    controller: "ReviewcampaignsCtrl"
  }).state('browseCampaigns',
  {
    url:"/browseCampaigns",
    templateUrl:"views/browseCampaigns.html",
    controller: "BrowsecampaignsCtrl"
  })



})
