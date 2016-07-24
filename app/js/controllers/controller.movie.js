'use strict';

angular.module('MovieTracker.controllers')

// Movies List Controller
.controller('MovieListProfileCtrl', function($scope, movieService) {

	$scope.movieList = [];


	$scope.getMovies = function(){
		var call = movieService.getMovies();
		call.then(
			function(payload){
				$scope.movieList = payload.data;
			}, 
			function(){});
	}


    $scope.$on('$viewContentLoaded', function() {
    	$scope.getMovies();
    });


})



//  Home Controller 
.controller('MovieProfileCtrl', function($scope, movieService, $stateParams) {

	$scope.movieData= {};

	$scope.getMovieProfile = function(){
		var call = movieService.getMovieProfile(771442750);
		call.then(
			function(payload){
				$scope.movieData = payload.data;
			}, 
			function(){});
	}

	

    $scope.$on('$viewContentLoaded', function() {
    	$scope.getMovieProfile();
    });


})



