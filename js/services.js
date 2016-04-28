var onmServices = angular.module('onmServices', ['ngResource']);

onmServices.factory('Daily', ['$resource', function ($resource) {
    var factory = {};

    factory.getDaily = $resource('js/data/daily.txt', {});

    return factory;
} ]);

onmServices.factory('Overnight', ['$resource', function ($resource) {
    return $resource('js/data/overnight.txt', {});
} ]);

onmServices.factory('EcoCal', ['$resource', function ($resource) {
    return $resource('js/data/eco.php', {});
} ]);

onmServices.factory('BBG', ['$resource', function ($resource) {
    return $resource("/js/data/bbg_last.php", { ticker: '@ticker' });
} ]);

onmServices.factory('RSS', ['$resource', function ($resource) {
    return $resource("/js/data/rss.php?source=@source", {source:'@source'});
} ]);

onmServices.factory('Readability', ['$resource', function ($resource) {
    return $resource("/js/data/readability.php?url=@url", {url:'@url'});
} ]);

onmServices.factory('Proxy', ['$resource', function ($resource) {
    return $resource("/old/ba-simple-proxy.php?url=@url", {url:'@url'});
} ]);

onmServices.factory('FXCM', ['$resource', function ($resource) {
    return $resource("/js/data/fxcm.php", {});
} ]);

onmServices.service('EconomicCalendar', ['$http', 'EconomicData', function ($http, EconomicData) {
    var EconomicCalendar = function () {

        this.initialize = function () {
            var url = 'js/data/eco.php';
            var self = this;
            this.eco = [];
            $http.get(url).then(function (response) {
                for (neweco in response.data.eco) {
                    this.eco.push(new EconomicData(neweco));
                }
            });
        };

        this.list = function () {
            return eco;
        }

        this.initialize();

    };


    return EconomicCalendar;

} ]);


onmServices.factory('EconomicData', function () {
    var EconomicData = function (initData) {

        this.initialize = function () {
            angular.extend(this, initData);
        };


        this.clsDate = function () {
            var data = new Date(this.date);
            data.setSeconds(0);
            data.setMinutes(0);
            data.setHours(0);

            var now = new Date();
            var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var tom = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

            if (data < today) {
                return "yest";
            }
            else if (data >= tom) {
                return "tom";
            }
            else {
                if (dat.actual == null || dat.actual == '') {
                    return "today new";
                }
                else {
                    return "today old";
                }
            }
        }

        this.clsActual = function () {

            if (this.actual == null || this.actual == '') {
                return "";
            }

            var last = Number(this.actual.match(/(\+|\-|[0-9]|\.)[0-9]*\.*[0-9]*/g));

            if (this.survey == null || this.survey == '') {
                if (this.prior == null || this.prior == '') {
                    return "";
                }
                else {
                    var target = Number(this.prior.match(/(\+|\-|[0-9]|\.)[0-9]*\.*[0-9]*/g));
                }
            }
            else {
                var target = Number(this.survey.match(/(\+|\-|[0-9]|\.)[0-9]*\.*[0-9]*/g));
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

        this.clsBadge = function () {
            var act = this.clsActual();
            var date = this.clsDate();

            if (date == "yest" || date == "today old") {
                if (act == "uptick") {
                    return "fa fa-plus-circle fa-fw";
                }
                else if (act == "downtick") {
                    return "fa fa-minus-circle fa-fw";
                }
                else {
                    return "fa fa-exchange fa-fw";
                }
            }
            else if (date == "today new") {
                return ""; //today
            }
            else {
                return ""; //tomorrow
            }
        }


        this.initialize();
    }

    return EconomicData;
});