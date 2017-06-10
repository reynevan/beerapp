'use strict';

// Declare app level module which depends on views, and components
angular.module('www', [
    'ngRoute',
    'www.home',
    'uiGmapgoogle-maps'
]).config(config).run(run);

config.$inject = ['$locationProvider', '$routeProvider', 'uiGmapGoogleMapApiProvider'];
function config($locationProvider, $routeProvider, uiGmapGoogleMapApiProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});

    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCJ8la6dZQrq1Ff-LQRf5Riz0wynjFFo9U',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
}

run.$inject = [];
function run() {
    document.getElementById('main-loader').remove();
}