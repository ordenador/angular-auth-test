(function (){
	'use strict';
	angular.module('auth-ordenador.services', [])

	.factory('restService', ['$resource', function ($resource) {
		var url = 'http://127.0.0.1:8000/rest-auth/';
		return $resource(
			url,
			{},
			{
				'login': {method:'POST', url : url + 'login\\/'},
				'logout': {method:'POST', url : url + 'logout\\/'},
				'getUser': {method:'GET', url : url + 'user\\/'},
				'update': {method: 'PUT'}, // usar POST
				'reviews': {'method': 'GET', 'params': {'reviews_only': 'true'}, isArray: true},
			}
		);
	}])

	.factory('authService', ['restService', '$http', '$cookies', '$q', function (restService, $http, $cookies, $q) {

		var authenticated = null;
		var userProfile = {};

		function login (userData) {
			return restService.login(userData).$promise.then(
				function(data){
					$http.defaults.headers.common.Authorization = 'Token ' + data.key;
					$cookies.token = data.key;
					authenticated = true;
				},
				function(error){
					console.log(error.status);
					// console.log(error.data.non_field_errors);
				});
		}

		function logout () {
			return restService.logout().$promise.then(
				function(){
					delete $http.defaults.headers.common.Authorization;
					delete $cookies.token;
					authenticated = false;
				},
				function(error){
					console.log(error.status);
					// console.log(error.data.non_field_errors);
				});
		}

		function profile () {
			return restService.getUser().$promise.then(
				function(data){
					console.log(data);
					console.log($http.defaults.headers.common.Authorization);
				},
				function(error){
					console.log(error.status);
					console.log(error.data.non_field_errors);
					authenticated = false;
				});
		}

		function getCookies(){
			return $cookies.token;
		}

		function isAuthenticated(){
			var header = $http.defaults.headers.common.Authorization;
			var da = this;
			var getAuthStatus = $q.defer();
			if (header){
				restService.getUser().$promise.then(
					function(data){
						userProfile.username = data.username;
						userProfile.email = data.email;
						userProfile.first_name = data.first_name;
						userProfile.last_name = data.last_name;
						da.authenticated = true;
						getAuthStatus.resolve('User logged');
					},
					function(error){
						da.authenticated = false;
						getAuthStatus.reject('User is not logged in: ' + error.status);
					});
			} else {
				da.authenticated = false;
				getAuthStatus.reject('User is not logged in.');
			}
			return getAuthStatus.promise;
		}

		function authenticatedStatus(){
			return authenticated;
		}

		return{
			login: login,
			logout: logout,
			profile: profile,
			getCookies: getCookies,
			isAuthenticated: isAuthenticated,
			authenticatedStatus: authenticatedStatus,
		};
	}]);

	
})();