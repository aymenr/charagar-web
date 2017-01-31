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
  'ngImgur',
  'ng.httpLoader'

  ])

 .run(function(userService,$rootScope)
{

    function checkLoggedInStatus()
    {
        if (userService.doesTokenExist())
        {
            userService.verifyToken().then(function(data)
                {
                    console.log("verified token");
                },
                function(errorMessage)
                {
                    console.log("token not authorized");
                })
        }
    }

    $rootScope.$on('$stateChangeStart', function(e, to)
    {
        //console.log("APP JS STATUS:",userService.isLoggedIn());
      if (!userService.isLoggedIn())
      {

        checkLoggedInStatus();
      }

    });
})
 .config(function($stateProvider, $urlRouterProvider, $httpProvider,httpMethodInterceptorProvider)
 {
    httpMethodInterceptorProvider.whitelistDomain('api.imgur.com');
   $httpProvider.interceptors.push('authInterceptor');
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
