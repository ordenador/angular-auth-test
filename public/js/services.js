(function (){
	'use strict';
	angular.module('myl.services', [])

	.factory('authService', ['$resource', function ($resource) {
		var url = 'http://127.0.0.1:8000/rest-auth/';
		return $resource(
			url,
			// {id: '@id' },
			{},
			{
				'login': {method:'POST', url : url + 'login\\/'},
				'getUser': {method:'GET', url : url + 'user\\/'},
				'update': {method: 'PUT'}, // usar POST
				'reviews': {'method': 'GET', 'params': {'reviews_only': 'true'}, isArray: true},
			}
		);
	}]);

	
})();