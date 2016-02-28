var onmControllers = angular.module('onmControllers', ['ngSanitize']);

onmControllers.controller('HomeController', ['$scope', 'Daily', '$http', function ($scope, Daily, $http) {
    $scope.daily = [];
    init();
    function init() {
        $scope.daily = Daily.getDaily.get();
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

    $scope.timeFix = function (time) {
        var d = new Date(time * 86400000);
        return d;
    }

} ]);

onmControllers.controller('OnController', ['$scope', 'DailyTest', function ($scope, DailyTest) {
    $scope.onColor = "#00B0F0";

    $scope.testPost = function () {
        console.log(DailyTest.save({ "ver": "cbilge", "data": "yo" }));
    }
    $scope.testGet = function() {
        console.log(DailyTest.get());
    }
    /*
    $scope.testPost = function () {
    var req = {
    method: 'POST',
    url: '/js/data/dailytest.php',
    data: "ver=cbilge&data=yo" 
    };
    $http(req).then(function (data) {
    console.log(data);
    }, function (data) {
    console.log("error");
    });
    }
    $scope.testGet = function () {
    var req = {
    method: 'GET',
    url: '/js/data/dailytest.php'
    };
    $http(req).then(function (data) {
    $scope.getResp = data;
    console.log("success");
    }, function (data) {
    $scope.getResp = data;
    console.log("error");
    });
    }*/


} ]);

onmControllers.controller('CalController', function($scope) {
    $scope.calColor = "#F39C11";
});

onmControllers.controller('EmController', ['$scope', 'FXCM', function ($scope, fxcm) {
    $scope.emColor = "#C0392B";

    $scope.data = fxcm.get();
    console.log($scope.data);
} ]);

onmControllers.controller('NewsController', ['$scope', 'bbgRss', 'Readability',  function ($scope, bbgRss, Readability) {
    $scope.newsColor = "#3498DB";
    $scope.activeText = "";

    $scope.feed = bbgRss.get();
    console.log($scope.feed);

    $scope.selectItem = function (item) {
        $scope.activeLink = item.link;
        $scope.activeText = Readability.get({url:item.link});
    }

} ]);
