'use strict';

var express = require('express'),
	app = express(),
	session = require('express-session'),
	passport = require('passport'),
	GitHubStrategy = require('passport-github').Strategy,
	GitHubApi = require('github');

var GITHUB_CLIENT_ID = '9230ea42e8a7b593c50a';
var GITHUB_CLIENT_SECRET = '05b87bf5f82f70ea6b108a0abd93ac16798bc854';

app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'quando omni flunkus moritati'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(obj, done){
	done(null, obj);
});

var requireAuth = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next();
}

var github = new GitHubApi({
	version: "3.0.0"
})

passport.use(new GitHubStrategy({
	clientID: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET,
	callbackURL: "http://localhost:9006/auth/github/callback"
}, function(accessToken, refreshToken, profile, done){
		User.findOrCreate({ githubId: profile.id }, function(err, user) {
			return done(err, user);
	});
}));

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github', {
	failureRedirect: '/login'
}), function(req, res){
	res.redirect('/#/home');
});

app.get('/api/github/following', /*requireAuth,*/ function(req, res){
	github.user.getFollowingFromUser({
		"user": "jasonalmaturner"
	}, function(err, response){
		console.log(JSON.stringify(response));
		res.status(200).send(response);
	})
})

app.listen(9006);