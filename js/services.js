var onmServices = angular.module('onmServices', ['ngResource']);

onmServices.factory('Daily', ['$resource',
	function($resource) {
		return $resource('js/data/daily.php', {}, {
			query: {method:'GET', params:{}, isArray:true}
		});
	}]);