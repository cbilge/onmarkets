var onmControllers = angular.module('onmControllers', []);

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

onmControllers.controller('OnController', function ($scope, $http) {
    $scope.onColor = "#00B0F0";
    $scope.getResp = "";
    $scope.testPost = function () {
        var req = {
            method: 'POST',
            url: '/js/data/dailytest.php',
            data: { 'ver': 'cbilge', 'data': 'yo' }
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
    }

});

onmControllers.controller('CalController', function($scope) {
    $scope.calColor = "#F39C11";
});

onmControllers.controller('EmController',['$scope','BBG', function($scope, BBG) {
    $scope.emColor = "#C0392B";

    $scope.getLast = function(ticker){
        $scope.last = BBG.getLast.get({ticker:"TRY:CUR"});
        console.log($scope.last);        
    }

}]);

onmControllers.controller('NewsController', ['$scope', 'bbgRss', function ($scope, bbgRss) {
    $scope.newsColor = "#3498DB";

    $scope.feed = bbgRss.get();
    console.log($scope.feed);
} ]);
