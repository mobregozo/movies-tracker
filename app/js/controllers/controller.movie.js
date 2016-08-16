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
		desc: false,
		availableOptions: [{
				label:'Id',
				name: 'id'
			}, {
				label:'Title',
				name: 'title'
			}, {
				label:'Imdb Id',
				name: 'imdbId'
			}, {
				label:'Release Date',
				name: 'releaseDate'
			}, {
				label:'Runtime',
				name: 'runtime'
			}, {
				label:'Language',
				name: 'language'
			}, {
				label:'Overview',
				name: 'overview'
			}, {
				label:'Populariry',
				name: 'popularity'
			},{
				label:'TagLine',
				name: 'tagline'
			},{
				label:'Average',
				name: 'average'
			}, {
				label:'Vote Count',
				name: 'voteCoun'
			}, {
				label:'Genre',
				name: 'genre'
			}
		],
		order: 'title'
	}
	
	$scope.resetFilters = function() {
		$scope.movieList = [];
		$scope.filters.page = 0;
		$scope.filters.query = '';
		$scope.filters.desc = false;
		$scope.filters.order = 'title';
	}

	$scope.getMovies = function() {
		$scope.loadingMovies = true;
		var call = movieService.getMovies(
			$scope.filters.page,
			$scope.filters.size,
			$scope.filters.query,
			$scope.filters.order,
			$scope.filters.desc);
		call.then(
			function(payload) {
				$scope.movieList = $scope.movieList.concat(payload.data.movies);
				$scope.avalaibleMovies = ($scope.movieList.length < $scope.filters.size) ? false : true;
			},
			function() {}).finally(function() {
			$scope.loadingMovies = false;
		})
	}


	$scope.$on('$viewContentLoaded', function() {
		$scope.getMovies();
	});

	$scope.loadMoreMovies = function() {
		if (!$scope.loadingMovies && $scope.avalaibleMovies) {
			$scope.filters.page = $scope.filters.page + 1;
			$scope.getMovies();
		}
	}

	$scope.$watchCollection('filters', function(newVal, oldVal) {
		if (!$scope.loadingMovies && newVal != oldVal) {
			$scope.filters.page = 0;
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