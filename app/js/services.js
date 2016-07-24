'use strict';

angular.module('MovieTracker.services')

.factory('clientService', function($http) {
    return {
        getClients: function(pageN, pageSize) {
            return $http.get('api/customers' + '?page=' + pageN + '&size=' + pageSize);
        },
        getClientsParams: function(pageN, pageSize, text) {
            return $http.get('api/customers', {
                params: {
                    page: pageN,
                    size: pageSize,
                    search_text: text
                }
            });
        }
    };
})