var app = angular.module('CoderFriends');

app.service('githubService', function($http){

	this.getFollowing = function(){
		return $http({
			method: 'GET',
			url: 'http://localhost:900'
		})
	}

})