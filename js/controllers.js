var onmControllers = angular.module('onmControllers', ['ngSanitize']);

onmControllers.controller('HomeController', ['$scope', 'Daily', '$http', function ($scope, Daily, $http) {
    $scope.daily = [];
    init();
    function init() {
        $scope.daily = Daily.getDaily.get();
    }

    $scope.selected = 0;
    $scope.themeColor = "#34495e";

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

    $scope.timeFix = function (time) {
        var d = new Date(time * 86400000);
        return d;
    }

} ]);

onmControllers.controller('OnController', ['$scope', 'DailyTest', function ($scope, DailyTest) {
    $scope.selected = 1;
    $scope.themeColor = "#00B0F0";
    $scope.testPost = function () {
        console.log(DailyTest.save({ "ver": "cbilge", "data": "yo" }));
    }
    $scope.testGet = function() {
        console.log(DailyTest.get());
    }


} ]);

onmControllers.controller('CalController', function($scope) {
    $scope.selected = 2;
    $scope.themeColor = "#F39C11";
    $scope.title = "Calendar";
});

onmControllers.controller('EmController', ['$scope', 'FXCM', function ($scope, fxcm) {
    $scope.selected = 3;
    $scope.themeColor = "#C0392B";
    $scope.title = "Markets";
    $scope.data = fxcm.get();
    console.log($scope.data);
} ]);

onmControllers.controller('NewsController', ['$scope', 'bbgRss', 'Readability', '$window', function ($scope, bbgRss, Readability, $window) {
    $scope.selected = 4;
    $scope.themeColor = "#3498DB";

    $scope.activeText = "";
    $scope.title = "News";

    $scope.feed = bbgRss.get();
    console.log($scope.feed);

    $scope.selectItem = function (item) {
        $scope.activeLink = item.link;
        console.log(item);
        $scope.activeText = Readability.get({ url: item.link });
        if ($window.innerWidth < 992) {
            $scope.fullRead = true;
            $scope.readerHeight = $window.innerHeight - 50;
        }
    }

    $scope.hideRead = function () {
        $scope.fullRead = false;
        $scope.activeLink = "";
    }

} ]);
