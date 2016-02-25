var onmServices = angular.module('onmServices', ['ngResource']);

onmServices.factory('Daily', ['$resource', function ($resource) {
    var factory = {};

    factory.getDaily = $resource('js/data/daily.txt', {}, {
        'query': { method: 'GET', isArray: false }
    });
    return factory;
} ]);