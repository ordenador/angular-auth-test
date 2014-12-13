(function (){
	'use strict';
	angular.module('myl.controllers', [])

	.controller('authController', ['authService', '$scope', function (authService, $scope) {
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

		$scope.authenticated = authService.authenticationStatus();
		
		// $scope.getUser = function(){
		// 	$http.defaults.headers.common.Authorization = 'Token fce4a0c4da639e7ca1a10b5b1390cf69ed7478d1';
		// 	authService.getUser().$promise.then(
		// 		function(data){
		// 			$http.defaults.headers.common.Authorization = 'Token ' + data.key;
		// 			$cookies.token = data.key;
		// 		},
		// 		function(error){
		// 			console.log(error.status);
		// 			console.log(error.data.non_field_errors);
		// 		});
		// };

	}]);
})();