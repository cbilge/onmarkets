var onmServices = angular.module('onmServices', ['ngResource']);

onmServices.factory('Daily', ['$resource', function ($resource) {
    var factory = {};

    factory.getDaily = $resource('js/data/daily.txt', {});

    return factory;
} ]);

onmServices.factory('Overnight', ['$resource', function ($resource) {
    return $resource('js/data/overnight.txt', {});
} ]);

onmServices.factory('EcoCal', ['$resource', function ($resource) {
    return $resource('js/data/eco.php', {});
} ]);

onmServices.factory('BBG', ['$resource', function ($resource) {
    return $resource("/js/data/bbg_last.php", { ticker: '@ticker' });
} ]);

onmServices.factory('RSS', ['$resource', function ($resource) {
    return $resource("/js/data/rss.php?source=@source", {source:'@source'});
} ]);

onmServices.factory('Readability', ['$resource', function ($resource) {
    return $resource("/js/data/readability.php?url=@url", {url:'@url'});
} ]);

onmServices.factory('Proxy', ['$resource', function ($resource) {
    return $resource("/old/ba-simple-proxy.php?url=@url", {url:'@url'});
} ]);

onmServices.factory('FXCM', ['$resource', function ($resource) {
    return $resource("/js/data/fxcm.php", {});
} ]);