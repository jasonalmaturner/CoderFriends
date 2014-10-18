var app = angular.module('CoderFriends');

app.controller('homeCtrl' function($scope, githubService){

	$scope.getFollowing = function(){
		githubService.getFollowing().then(function(response){
			$scope.followers = JSON.parse(response);
			console.log($scope.followers);
		})
	}

})