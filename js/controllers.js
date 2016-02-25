var onmControllers = angular.module('onmControllers', []);

onmControllers.controller('HomeController', ['$scope', 'Daily', '$http', function ($scope, Daily, $http) {
    $scope.message = "Hello World";
    $scope.daily = [];
    init();
    function init() {
        $scope.daily = Daily.getDaily.query();
        console.log($scope.items);
    }

    $scope.onColor = "#00B0F0";
    $scope.calColor = "#F39C11";
    $scope.emColor = "#C0392B";
    $scope.newsColor = "#3498DB";
} ]);

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
