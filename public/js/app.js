(function () {
	'use strict';
  var app = angular.module('myl', ['myl.controllers', 'myl.services', 'ngResource', 'ngCookies']);

  app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    }]);

})();