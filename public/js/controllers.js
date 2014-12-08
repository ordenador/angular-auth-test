(function (){
	'use strict';
	angular.module('myl.controllers', [])

	.controller('authController', ['authService', '$scope', '$location', '$cookies', '$http', function (authService, $scope, $location, $cookies, $http) {
		$scope.model = {'username':'','password':''};

		$scope.login = function(){
			// $http.defaults.headers.common.Authorization = 'Token c3658d6b0f37cb0e044a7be6fef7c9c71cda9f4f';
			authService.login($scope.model).$promise.then(
				function(data){
                    $http.defaults.headers.common.Authorization = 'Token ' + data.key;
                    $cookies.token = data.key;
				},
				function(error){
					console.log(error.status);
					console.log(error.data.non_field_errors);
				});
		};

		$scope.getUser = function(){
			$http.defaults.headers.common.Authorization = 'Token c3658d6b0f37cb0e044a7be6fef7c9c71cda9f4f';
			authService.getUser($scope.model).$promise.then(
				function(data){
                    $http.defaults.headers.common.Authorization = 'Token ' + data.key;
                    $cookies.token = data.key;
				},
				function(error){
					console.log(error.status);
					console.log(error.data.non_field_errors);
				});
		};

	}]);
})();