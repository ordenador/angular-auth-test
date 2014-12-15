(function () {
	'use strict';
  var app = angular.module('auth-ordenador', ['auth-ordenador.controllers', 'auth-ordenador.services', 'ngResource', 'ngCookies', 'ui.router']);

  app.config(['$httpProvider', '$stateProvider','$urlRouterProvider',function ($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';


    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'view/main.html',
        controller: 'authController',
        data: {
          requiresLogin: false,
        }
      })
      .state('private', {
        url: '/private',
        templateUrl: 'view/private.html',
        data: {
          requiresLogin: true,
        }
      });

    }]);

  app.run(['$rootScope', '$http', '$location', '$state', 'authService', function ($rootScope, $http, $location, $state, authService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

      if (authService.getCookies()){
        $http.defaults.headers.common.Authorization = 'Token ' + authService.getCookies();
        authService.isAuthenticated().then(
          function(data){
            console.log(data);
          });
      }

      if (toState.data && toState.data.requiresLogin){
        // User isn’t authenticated
        authService.isAuthenticated().catch(
          function(error){
            event.preventDefault();
            $state.go('main');
          });
      }
    });

  }]);


})();