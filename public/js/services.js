(function (){
	'use strict';
	angular.module('myl.services', [])

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

	.factory('authService', ['restService', '$http', '$cookies', function (restService, $http, $cookies) {
		'use strict';
		var authPromise = null;

		function login (userData) {
			return restService.login(userData).$promise.then(
				function(data){
					$http.defaults.headers.common.Authorization = 'Token ' + data.key;
					$cookies.token = data.key;
				},
				function(error){
					console.log(error.status);
					console.log(error.data.non_field_errors);
				});
		}

		function logout () {
			return restService.logout().$promise.then(
				function(){
					delete $http.defaults.headers.common.Authorization;
					delete $cookies.token;
					this.authPromise = null;
				},
				function(error){
					console.log(error.status);
					console.log(error.data.non_field_errors);
				});
		}

		function profile () {
			if(this.authenticationStatus()){
				return restService.getUser().$promise.then(
					function(data){
						console.log(data);
						console.log(this.authPromise);
						console.log($http.defaults.headers.common.Authorization);
					},
					function(error){
						console.log(error.status);
						console.log(error.data.non_field_errors);
					});
			}
		}


		//test
		// function authenticationStatus () {
		// 	'use strict';
		// 	var header = $http.defaults.headers.common.Authorization;

		// 	if (this.authPromise == null && header){
		// 		this.authPromise = restService.getUser().$promise.then(
		// 			function (data) {
		// 				return data;
		// 		});
		// 	}
			
		// 	if (header && this.authPromise){
		// 		return true;
		// 	} else {
		// 		return false;	
		// 	}
		// }

		return{
			login: login,
			logout: logout,
			profile: profile,
			authenticationStatus: authenticationStatus,
		};
	}]);

	
})();