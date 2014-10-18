var app = angular.module('CoderFriends', ['ngRoute',]);

app.config(['$routeProvider', function($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl: '/auth/github'
		})
		.when('/home', {
			templateUrl: 'home.html'
		})
		.when('/friend/:github_username', {
			templateUrl: 'friend.html'
		})

}])