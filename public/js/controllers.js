(function (){
	'use strict';
	angular.module('auth-ordenador.controllers', [])

	.controller('authController', ['authService', '$scope',function (authService, $scope) {
		$scope.model = {'username':'','password':''};

		$scope.login = function () {
			return authService.login($scope.model);
		};
		
		$scope.logout = function () {
			return authService.logout();
		};

		$scope.getUser = function () {
			return authService.profile();
		};
		
		$scope.getCookies = function (){
			return authService.getCookies();
		};

		$scope.authenticatedStatus = function(){
			return authService.authenticatedStatus();
		};

	}]);
})();