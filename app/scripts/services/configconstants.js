'use strict';

/**
 * @ngdoc service
 * @name charagarApp.configConstants
 * @description
 * # configConstants
 * Constant in the charagarApp.
 */
 angular.module('charagarApp')
 .constant('configConstants',
 {
 	apiPrefix: "http://localhost:3000/",
 	authorizedApiPrefix: "http://localhost:3000/api/v1/",
 	adminApiPrefix: "http://localhost:3000/api/v1/admin/",
 	userApiPrefix:"http://localhost:3000/api/v1/user/",
 	imgurClientID:"4c8a0a606234adf",
 	imgurClientSecret:"2b63ec31c9df5fbcd561e4e81b68b0c1db8b4889"
 });

