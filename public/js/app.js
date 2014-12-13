(function () {
	'use strict';
  var app = angular.module('myl', ['myl.controllers', 'myl.services', 'ngResource', 'ngCookies', 'ngRoute']);

  app.config(['$httpProvider', '$routeProvider',function ($httpProvider, $routeProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';


    $routeProvider
      .when('/', {
        templateUrl: 'view/main.html',
        controller: 'authController',
        // resolve: {
        //   authenticated: ['authService', function(authService){
        //     return authService.authenticationStatus();
        //   }],
        // }
      })
      .otherwise({
        redirectTo: '/'
      });

    }]);

  // app.run(['$rootScope', '$location', '$cookieStore', '$http', 'tabsService',
  //   function ($rootScope, $location, $cookieStore, $http, tabsService) {
  //       // keep user logged in after page refresh
  //       $rootScope.globals = $cookieStore.get('globals') || {};
  //       if ($rootScope.globals.currentUser) {
  //           $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
  //           var tabTest = { title: $rootScope.globals.currentUser.username, link: '/login'};
  //           tabsService.login(tabTest);
  //       }

  //       // $rootScope.$on('$routeChangeStart', function (event, next, current) {
  //       //     // redirect to login page if not logged in
  //       //     if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
  //       //         $location.path('/login');
  //       //     }
  //       // });
  //   }]);


})();