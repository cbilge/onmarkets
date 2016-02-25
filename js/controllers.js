var onmControllers = angular.module('onmControllers', []);

onmControllers.controller('HomeController', ['$scope', 'Daily', '$http', function ($scope, Daily, $http) {
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

    $scope.getColor = function (mod) {
        if (mod == 1) {
            return "uptick";
        }
        else if (mod == -1) {
            return "downtick";
        }
        else {
            return "";
        }
    }

    $scope.dateFix = function (dt) {
        console.log(dt);

        var d = Date.parse(dt);
        return d;
    }

    $scope.timeFix = function (time) {
        var d = new Date(time * 86400000);
        return d;
    }

} ]);

onmControllers.controller('OnController', function($scope) {
   $scope.onColor = "#00B0F0";
});

onmControllers.controller('CalController', function($scope) {
    $scope.calColor = "#F39C11";
});

onmControllers.controller('EmController', function($scope) {
    $scope.emColor = "#C0392B";
});

onmControllers.controller('NewsController', ['$scope', function($scope) {
	 $scope.newsColor = "#3498DB";
}]);
