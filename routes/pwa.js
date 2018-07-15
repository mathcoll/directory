'use strict';
var express = require('express');
var router	= express.Router();
var ResourceSerializer = require('../serializers/resource');
var users;

router.get('/home', function(req, res) {
	res.render('home', {
		currentUrl: req.path,
		user: req.session.user
	});
});

router.get('/home/resources', function(req, res) {
	var resources = [
	    {
	    	url: 'https://',
	    	image: 'https://image.jpg',
	    	labels: ['label-1', 'label-2', 'label-3']
	    },
	];
	res.json('home', {
		currentUrl: req.path,
		json: resources,
		user: req.session.user
	});
});

router.get('/home/types', function(req, res) {
	res.render('home', {
		currentUrl: req.path,
		user: req.session.user
	});
});

router.get('/home/labels', function(req, res) {
	res.render('home', {
		currentUrl: req.path,
		user: req.session.user
	});
});


router.get('/', function(req, res) {
	res.render('index', {
		currentUrl: req.path,
		user: req.session.user
	});
});

router.get('/resources|types|labels', function(req, res) {
	res.redirect('/home');
});


module.exports = router;
