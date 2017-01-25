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

 	// this.saveCampaign = function(campaign)
 	// {
 	// 	var input = {"campaign": campaign};

 	// 	_.extend(input, {"userId":userService.getUserInfo()._id});

 	// 	console.log("LOOK CAMPAIGNW OW:", input);
 	// 	return $http.post(apiPrefix + 'saveCampaign/', input).then(function(result)
 	// 	{
 	// 		console.log("SAVED");

 	// 	});
 	// }

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

 	this.getCampaign = function(campaignId)
 	{

 		return $http.get(apiPrefix + 'getCampaign/' + campaignId).then(function(result)
 		{

 			return result.data
 		});
 	}


 });
