'use strict';

angular.module('MovieTracker.services')

.factory('movieService', function($http, config) {
	return {
		getMovies: function(page, size, query, order, desc) {
			return $http.get(config.apiUrl + '/movies/', {
				params: {
					page: page,
					size: size,
					query: query,
					orderBy: order,
					desc: desc
				}
			});
		},
		getMovieProfile: function(movieId) {
			return $http.get(config.apiUrl + '/movie/' + movieId+'/');
		}
	};
})

//Directive to handle when the scroll is at the bottom of an element
.directive('scrolly', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var raw = element[0];
            element.bind('scroll', function() {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    scope.$apply(attrs.scrolly);
                }
            });
        }
    };
})