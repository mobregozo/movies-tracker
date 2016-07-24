'use strict';

angular.module('MovieTracker.services')

.factory('movieService', function($http) {
    return {
        getMovies: function() {
            return $http.get('data/movies.json');
        },
        getMovieProfile: function(link) {
            return $http.get('http://api.rottentomatoes.com/api/public/v1.0/movies/'+link+'.json?apikey=9htuhtcb4ymusd73d4z6jxcj');
        }
    };
})