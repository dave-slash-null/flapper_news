angular.module('flapperNews', ['ui.router'])

.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		})
		.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});

	$urlRouterProvider.otherwise('/home')

}])

.factory('posts', [function(){

	var o = {
		posts: [
			{title: 'post 1', upvotes: 5, comments: []},
			{title: 'post 2', upvotes: 2, comments: []},
			{title: 'post 3', upvotes: 15, comments: []},
			{title: 'post 4', upvotes: 9, comments: []},
			{title: 'post 5', upvotes: 4, comments: []}
		]
	};

	return o;

}])

.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){

	$scope.test = 'Hello world!';
	$scope.posts = posts.posts;

	$scope.addPost = function() {
		if(!$scope.title || $scope.title === '') {return;}
		$scope.posts.push({
			title: $scope.title, 
			link: $scope.link, 
			upvotes: 0,
			comments: []
		});
		$scope.title = '';
		$scope.link = '';
	}

	$scope.incrementUpvotes = function(post) {
		post.upvotes += 1;
	}

}])

.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts) {
	$scope.post = posts.posts[$stateParams.id];

	$scope.addComment = function() {
		if(!$scope.body || $scope.body === '') {return;}
		$scope.post.comments.push({
			body: $scope.body,
			author: 'user',
			upvotes: 0
		});
		$scope.body = '';
	}

	$scope.incrementUpvotes = function(comment) {
		comment.upvotes += 1;
	}
}])
