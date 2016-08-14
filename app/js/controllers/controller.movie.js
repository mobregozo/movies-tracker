'use strict';

angular.module('MovieTracker.controllers')

// Movies List Controller
.controller('MovieListCtrl', function($scope, movieService) {

	$scope.movieList = [];
	$scope.loadingMovies = false;
	$scope.avalaibleMovies = false;
	$scope.filters = {
		page: 0,
		size: 10,
		query: '',
		orderBy: 'genre',
		desc: false,
		availableOptions: [{
			name: 'genre'
		}, {
			name: 'year'
		}, {
			name: 'name'
		}, {
			name: 'release date'
		}],
		order: {
			name: 'genre'
		}
	}


	$scope.getMovies = function() {
		$scope.loadingMovies = true;
		var call = movieService.getMovies(
			$scope.filters.page,
			$scope.filters.size,
			$scope.filters.query,
			$scope.filters.order.name,
			$scope.filters.desc);
		call.then(
			function(payload) {
				$scope.movieList = $scope.movieList.concat(payload.data.movies);
				$scope.avalaibleMovies = ($scope.movieList.length < $scope.filters.size) ? false : true;
			},
			function() {}).finally(function(){
				$scope.loadingMovies = false;
			})
	}


	$scope.$on('$viewContentLoaded', function() {
		$scope.getMovies();
	});

	$scope.loadMoreMovies = function() {
        if (!$scope.loadingMovies && $scope.avalaibleMovies) {
            $scope.filters.page= $scope.filters.page+1;
            $scope.getMovies();
        }
    }

	$scope.$watch('filters', function(newVal, oldVal) {
		if (!$scope.loadingMovies && newVal!= oldVal) {
			$scope.filters.page= 0;
		$scope.movieList = [];
		$scope.getMovies();
        }
		
	}, true);


})



//  Home Controller 
.controller('MovieProfileCtrl', function($scope, movieService, $stateParams) {

	$scope.movieData = {};

	$scope.getMovieProfile = function() {
		var call = movieService.getMovieProfile($stateParams.movieId);
		call.then(
			function(payload) {
				$scope.movieData = payload.data;
			},
			function() {});
	}



	$scope.$on('$viewContentLoaded', function() {
		$scope.getMovieProfile();
	});


})


// Movies List Controller
.controller('MoviesRecomendedCtrl', function($scope, movieService) {

	$scope.movieList = [];


	$scope.getMovies = function() {
		var call = movieService.getMovies();
		call.then(
			function(payload) {
				$scope.movieList = payload.data;
			},
			function() {});
	}


	$scope.$on('$viewContentLoaded', function() {
		$scope.getMovies();
	});


})