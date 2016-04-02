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

onmControllers.controller('OnController', ['$scope', 'Overnight', function ($scope, Overnight) {
    $scope.selected = 1;
    $scope.themeColor = "#00B0F0";
    $scope.ondata = Overnight.get();
    console.log($scope.ondata.synopsis);
    $scope.region = function (data) {
        var cls = "";
        if (data.name == "Asia" || data.name == "Americas" || data.name == "EMEA") {
            cls = "region";
            if (data.totz < -0.3) {
                cls += " down";
            }
            else if (data.totz > 0.3) {
                cls += " up";
            }
        }
        return cls;
    }
    $scope.getColor = function (mod) {
        var zLarge = 0.7;
        var zSmall = 0.3;

        if (mod < -zLarge) {
            return "down2";
        }
        else if (mod < -zSmall) {
            return "down1";
        }
        else if (mod > zSmall) {
            return "up1";
        }
        else if (mod > zLarge) {
            return "up2";
        }
        else {
            return "";
        }
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
