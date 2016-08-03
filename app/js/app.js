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
    apiUrl: 'http://ec2-54-191-9-10.us-west-2.compute.amazonaws.com:3000'
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

    .state('app.about', {
        url: 'about',
        views: {
            'mainView': {
                templateUrl: 'views/about/about.html'
            }
        },
        menu: 'About'

    })

    .state('app.recomendedMovies', {
        url: 'recomended/',
        views: {
            'mainView': {
                templateUrl: 'views/movie/movie-list-recomended.html',
                controller: 'MoviesRecomendedCtrl'
            }
        },
        menu: 'Recomended'
    })

    .state('app.movies', {
        url: 'movies/',
        views: {
            'mainView': {
                templateUrl: 'views/movie/movie-list.html',
                controller: 'MovieListCtrl'
            }
        },
        menu: 'Movies'
    })

 

    .state('app.movie', {
        url: 'movies/:movieId',
        views: {
            'mainView': {
                templateUrl: 'views/movie/movie-profile.html',
                controller: 'MovieProfileCtrl'
            }
        },
        menu: 'Movies'
    })
    
    //Default Route
    $urlRouterProvider.otherwise('/movies');
})