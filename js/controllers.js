var onmControllers = angular.module('onmControllers', []);

onmControllers.controller('HomeController', function($scope) {
	$scope.message = "Hello World";
});

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
