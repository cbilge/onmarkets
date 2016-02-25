var onmServices = angular.module('onmServices', ['ngResource']);

onmServices.factory('Feed', ['$resource',
	function($resource) {
		return $resource('https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/photos.json'), {}, {
			query: {method:'GET', params:{}, isArray:true}
		}	   
	}]);