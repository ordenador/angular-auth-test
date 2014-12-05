(function (){
	'use strict';
	angular.module('myl.services', [])

	.factory('authService', ['$resource', function ($resource) {


		return $resource(
			'http://django-angular-oauth.herokuapp.com/rest-auth/login\\/',
			// {id: '@id' },
			{},
			{
				'login': {method:'POST', },
		        'get': {method:'GET', },
				'update': {method: 'PUT'}, // usar POST
				'reviews': {'method': 'GET', 'params': {'reviews_only': 'true'}, isArray: true},
			}
		);
	}]);

	
})();