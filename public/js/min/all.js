(function () {
  var app = angular.module('myl', ['myl.controllers', 'myl.services', 'ngResource']);



})();
(function (){
	'use strict';
	angular.module('myl.controllers', [])

	.controller('authController', ['authService', '$scope', '$location', function (authService, $scope, $location) {
		$scope.model = {'username':'','password':''};
		$scope.login = function(){


			authService.login($scope.model.username, $scope.model.password)
			.then(function(data){
				// success case
				$location.path('/');
				console.log('login OK: '+data);
			},function(data){
				// error case
				$scope.errors = data;
				console.log('Error Login: '+data);
			});
		};

	}]);

	
})();
(function (){
	'use strict';
	angular.module('myl.services', [])

	.factory('authService', ['$resource', function ($resource) {


		return $resource(
			'http://django-angular-oauth.herokuapp.com/rest-auth/user',
			{id: '@id' },
			{
				'login': {method:'POST', },
		        'get': {method:'GET', },
				'update': {method: 'PUT'}, // usar POST
				'reviews': {'method': 'GET', 'params': {'reviews_only': 'true'}, isArray: true},
			}
		);
	}]);

	
})();