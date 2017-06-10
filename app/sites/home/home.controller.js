'use strict';

angular.module('www.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'sites/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            bindToController: true
        });
    }])

    .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = [];

function HomeCtrl() {
    var vm = this;
    vm.map = {
        center: {
            latitude: 50.061776,
            longitude: 19.937383
        },
        zoom: 15,
        disableDefaultUI: true,
        mapTypeControl: false,
        panControl: false
    };
}