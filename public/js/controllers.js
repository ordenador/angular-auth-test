(function (){
	'use strict';
	angular.module('myl.controllers', [])

	.controller('authController', ['authService', '$scope', '$location', function (authService, $scope, $location) {
		$scope.model = {'username':'','password':''};

		$scope.login = function(){
			authService.login($scope.model);
			// .$promise.then(function (data) {
			// 	console.log(data);
			// })
		};

	}]);

	
})();
