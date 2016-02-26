var onmServices = angular.module('onmServices', ['ngResource']);

onmServices.factory('Daily', ['$resource', function ($resource) {
    var factory = {};

    factory.getDaily = $resource('js/data/daily.txt', {});

    return factory;
} ]);

onmServices.factory('BBG', ['$resource', function ($resource) {
    var factory = {};
    var bbgUrl = "http://www.bloomberg.com/quote/";
    factory.getLast = $resource("http://www.bloomberg.com/quote/:ticker", { ticker: '@ticker' });
    return factory;
} ]);

onmServices.factory('bbgRss', ['$resource', function ($resource) {
    return $resource("/js/data/bbg_rss.php", {});
} ]);