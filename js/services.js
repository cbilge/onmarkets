<<<<<<< HEAD
var onmServices = angular.module('onmServices', ['ngResource']);

onmServices.factory('Daily', ['$resource', function ($resource) {
    var factory = {};

    factory.getDaily = $resource('js/data/daily.txt', {}, {
        'query': { method: 'GET', isArray: false }
    });
    return factory;
=======
var onmServices = angular.module('onmServices', ['ngResource']);

onmServices.factory('Daily', ['$resource', function ($resource) {
    var factory = {};

    factory.getDaily = $resource('js/data/daily.txt', {}, {
        'query': { method: 'GET', isArray: false }
    });
    return factory;
>>>>>>> f830985772d9b93720695f1f65c86c73f5381cab
} ]);