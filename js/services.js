var onmServices = angular.module('onmServices', []);

onmServices.factory('Daily', ['$http', '$q', function ($http, $q) {
    return {
        ajaxItems: function () {
            var deferred = $q.defer();
            $http({ method: "GET", url: "data/daily.txt" })
                .success(function (data, status, headers, config) {
                    console.log(data);
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(data);
                    deferred.reject(status);
                });
            return deferred.promise;
        }
    }
}]);