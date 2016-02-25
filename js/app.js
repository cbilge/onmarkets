var app = angular.module('onmApp', [
	'ngRoute',
	'onmControllers',
	'onmServices'
	]);

app.config(['$routeProvider', function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      controller: 'HomeController', 
      templateUrl: 'views/home.html' 
    }) 
    .when('/on', { 
      controller: 'OnController', 
      templateUrl: 'views/on.html' 
    })	
	.when('/calendar', { 
      controller: 'CalController', 
      templateUrl: 'views/calendar.html' 
    })	
	.when('/em', { 
      controller: 'EmController', 
      templateUrl: 'views/em.html' 
    })	
	.when('/news', { 
      controller: 'NewsController', 
      templateUrl: 'views/news.html' 
    })	
    .otherwise({ 
      redirectTo: '/' 
    }); 
}]);