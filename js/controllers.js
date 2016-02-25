var onmControllers = angular.module('onmControllers', []);

onmControllers.controller('HomeController',['$scope', 'Daily', function($scope, Daily) {
	$scope.message = "Hello World";
    $scope.synopsis = Daily.query();
}]);

onmControllers.controller('OnController', function($scope) {
	$scope.message = "Hello World";
});

onmControllers.controller('CalController', function($scope) {
	$scope.message = "Hello World";
});

onmControllers.controller('EmController', function($scope) {
	$scope.message = "Hello World";
});

onmControllers.controller('NewsController', ['$scope', 'Feed', function($scope, Feed) {
	$scope.feed = Feed.query();
}]);
