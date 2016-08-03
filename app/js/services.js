'use strict';

angular.module('MovieTracker.services')

.factory('movieService', function($http, config) {
    return {
        getMovies: function() {
            return $http.get(config.apiUrl);
        },
        getMovieProfile: function(movieId) {
            return $http.get(config.apiUrl+'/movies/'+movieId);
        }
    };
})