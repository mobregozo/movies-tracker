'use strict';

angular.module('MovieTracker.services')

.factory('movieService', function($http, config) {
    return {
        getMovies: function() {
            return $http.get(config.apiUrl+'/movies');
        },
        getMovieProfile: function(movieId) {
            return $http.get(config.apiUrl+'/movie/'+movieId);
        }
    };
})