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

onmControllers.controller('CalController', ['$scope', 'EcoCal', function ($scope, EcoCal) {
    $scope.selected = 2;
    $scope.themeColor = "#F39C11";
    $scope.title = "Calendar";
    $scope.ecodata = EcoCal.get();

    $scope.clsDate = function (dat) {
        var data = new Date(dat.date);
        data.setSeconds(0);
        data.setMinutes(0);
        data.setHours(0);

        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var tom = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        console.log("data: " + data + " today: " + today + " tom: " + tom + " data: " + dat.date);
        if (data < today) {
            console.log("yest");
            return "yest";
        }
        else if (data >= tom) {
            console.log("tom");
            return "tom";
        }
        else {
            if (dat.actual == "-") {
                console.log("tod new");
                return "today new";
            }
            else {
                console.log("tod old");
                return "today old";
            }
        }
    }

    $scope.clsActual = function (dat) {
        var last = dat.actual;
        if (last == "-") {
            return "";
        }

        if (dat.survey == "-") {
            var target = dat.prior;
        }
        else {
            var target = dat.survey;
        }


        if (last < target) {
            return "downtick";
        }
        else if (last > target) {
            return "uptick";
        }
        else {
            return "";
        }
    }

} ]);

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
