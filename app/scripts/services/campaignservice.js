'use strict';

/**
 * @ngdoc service
 * @name charagarApp.campaignService
 * @description
 * # campaignService
 * Service in the charagarApp.
 */
 angular.module('charagarApp')
 .service('campaignService', function (userService,$http,configConstants) {
 	var apiPrefix = configConstants.apiPrefix;
 	var authorizedApiPrefix = configConstants.authorizedApiPrefix;

 	this.saveCampaign = function(campaign)
 	{
 		var input = {"campaign": campaign};

 		return $http.post(authorizedApiPrefix + 'saveCampaign/', input).then(function(result)
 		{


 		});
 	}

 	this.getLiveCampaigns = function()
 	{

 		return $http.get(apiPrefix + 'getLiveCampaigns').then(function(result)
 		{

 			return result.data
 		});
 	}


 	this.getPastCampaigns = function()
 	{

 		return $http.get(apiPrefix + 'getPastCampaigns').then(function(result)
 		{

 			return result.data
 		});
 	}

 	this.getAllCampaigns = function()
 	{

 		return $http.get(apiPrefix + 'getAllCampaigns').then(function(result)
 		{

 			return result.data
 		});
 	}

 	this.getCampaign = function(campaignId)
 	{

 		return $http.get(apiPrefix + 'getCampaign/' + campaignId).then(function(result)
 		{

 			return result.data
 		});
 	}

 	this.getZakaatFund = function()
 	{

 		return $http.get(apiPrefix + 'getZakaatFund' ).then(function(result)
 		{

 			return result.data
 		});
 	}

 	this.getGeneralFund = function()
 	{

 		return $http.get(apiPrefix + 'getGeneralFund' ).then(function(result)
 		{

 			return result.data
 		});
 	}

 	this.getCampaignsForUser = function(userId)
 	{

 		return $http.post(authorizedApiPrefix + 'getCampaignsForUser', userId).then(function(result)
 		{

 			return result.data
 		});
 	}


 	this.getContributionsForUser = function(userId)
 	{

 		return $http.post(authorizedApiPrefix + 'getContributionsForUser/', userId).then(function(result)
 		{

 			return result.data
 		});
 	}

 	this.getCampaignsByCategory = function(category)
 	{

 		return $http.post(apiPrefix + 'getCampaignsByCategory/',category ).then(function(result)
 		{

 			return result.data
 		});
 	}


 	this.editCampaign = function(input)
 	{

 		return $http.post(apiPrefix + 'editCampaign/', input).then(function(result)
 		{

 			return result.data
 		});
 	}

 });
