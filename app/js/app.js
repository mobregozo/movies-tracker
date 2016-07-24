'use strict';

angular.module('MovieTracker.controllers', []);
angular.module('MovieTracker.services', []);

//Dependencies
angular.module('MovieTracker', [
    'ui.bootstrap',
    'ui.router',
    'MovieTracker.controllers',
    'MovieTracker.services',
])

.constant("config", {
    apiURL: 'http://localhost:5001'
})

.run(function($rootScope){
     //Save menu navigation
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        $rootScope.menuNavigation = toState.menu;
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    
    //ABSTRACT VIEW
    .state('app', {
        url: '/',
        abstract: true,
        templateUrl: 'views/header.html',
        controller: 'NavigationCtrl'
    })
    
    //HOME
    .state('app.home', {
        url: 'home',
        views: {
            'mainView': {
                templateUrl: 'views/home/home.html',
                controller: 'HomeCtrl'
            }
        },
        menu: 'Home'

    })

    .state('app.movie', {
        url: 'movie/:movieId',
        views: {
            'mainView': {
                templateUrl: 'views/movie/movie-profile.html',
                controller: 'MovieProfileCtrl'
            }
        },
        menu: 'Movies'

    })
    
    //Default Route
    $urlRouterProvider.otherwise('/home');
})