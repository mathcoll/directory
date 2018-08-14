'use strict';
var express = require('express');
var router	= express.Router();
var ResourceSerializer = require('../serializers/resource');
var users;
var secret = process.env.SECRET; // That's a super bad security!

router.get('/', function(req, res) {
	res.render('index', {
		currentUrl: req.path,
		gtm: process.env.GTM,
		user: req.session.user
	});
});

router.get('/v1.0.0/resources/:id([0-9a-z\-]+)?', function(req, res) {
	var id = req.params.id;
	var label = req.query.label;
	var resources = db.getCollection('resources');
	var resource;
	
	var query;
	if ( id ) {
		if ( label ) {
			query = {
				'$and': [
						{ 'labels' : { '$contains' : label } },
						{ 'id': id }
					]
				};
		} else {
			query = { 'id': id };
		}
	} else {
		if ( label ) {
			query = {
				'$and': [
						{ 'labels' : { '$contains' : label } },
					]
				};
		} else {
			query = {};
		}
	}

	resource = resources.chain().find(query).simplesort('title', false).data();
	if ( resource ) {
		res.status(200).send(resource); 
	} else {
		res.status(404).send({'id': 40, 'code': 404, 'message': 'Not Found'});
	}
});

router.get('/v1.0.0/?(:resource_type)?', function(req, res) {
	var label = req.query.label;
	var resource_type = req.params.resource_type;
	res.setHeader("Content-Type", "application/json");
	
	var query;
	if ( resource_type ) {
		if ( label ) {
			query = {
				'$and': [
						{ 'labels' : { '$contains' : label } },
						{ 'type': resource_type }
					]
				};
		} else {
			query = { 'type': resource_type };
		}
	} else {
		if ( label ) {
			query = {
				'$and': [
						{ 'labels' : { '$contains' : label } },
					]
				};
		} else {
			query = { 'type': undefined };
		}
	}
	
	if ( req.params.resource_type===undefined || req.params.resource_type == "websites" || req.params.resource_type == "articles" || req.params.resource_type == "sensors" || req.params.resource_type == "devices" || req.params.resource_type == "terms" ) {
		var resources = db.getCollection('resources');
		var json = resources.chain().find(query).simplesort('title', false).data();
		res.status(200).send(json);
	} else {
		res.status(404).send({'id': 41, 'code': 404, 'message': 'Not Found'});
	}
});

router.post('/v1.0.0/resources', function(req, res) {
	var resources = db.getCollection('resources');
	if ( req.body.secret == secret && req.body.type !== undefined ) {
		var new_resource = {
			id:			uuid.v4(),
			type: 		req.body.type,
			title:		req.body.title!==undefined?req.body.title:'',
			subtitle:  	req.body.subtitle!==undefined?req.body.subtitle:'',
			url:  		req.body.url!==undefined?req.body.url:'',
			labels:		req.body.labels!==undefined?req.body.labels:new Array(),
			color:		req.body.color!==undefined?req.body.color:"success",
			col:		req.body.col!==undefined?req.body.col:"col-md-12",
		};
		resources.insert(new_resource);
		
		res.status(201).send({ 'code': 201, message: 'Created', resource: new_resource });
	}
});

router.put('/v1.0.0/resources/:id([0-9a-z\-]+)', function(req, res) {
	var id = req.params.id;
	var resources = db.getCollection('resources');
	if ( req.body.secret == secret ) {
		var result;
		resources.chain().find({ 'id': id }).update(function(resource) {
			resource.type		= req.body.type!==undefined?req.body.type:resource.type;
			resource.title		= req.body.title!==undefined?req.body.title:resource.title;
			resource.subtitle	= req.body.subtitle!==undefined?req.body.subtitle:resource.subtitle;
			resource.url		= req.body.url!==undefined?req.body.url:resource.url;
			resource.labels		= req.body.labels!==undefined?req.body.labels:resource.labels;
			resource.color		= req.body.color!==undefined?req.body.color:resource.colors;
			resource.col		= req.body.col!==undefined?req.body.col:resource.col;
			result = resource;
		});
		if ( result !== undefined ) {
			db.save();
			res.status(200).send({ 'code': 200, message: 'Successfully updated', resource: result });
		} else {
			res.status(404).send({'id': 42, 'code': 404, 'message': 'Not Found'});
		}
	}
});

router.delete('/v1.0.0/resources/:id([0-9a-z\-]+)', function(req, res) {
	var id = req.params.id;
	var resources = db.getCollection('resources');
	var resource = resources.find({ 'id': id });
	if ( resource.length > 0 && req.body.secret == secret ) {
		resources.remove(resource);
		db.saveDatabase();
		res.status(200).send({ 'code': 200, message: 'Successfully deleted', removed_id: id }); 
	} else {
		res.status(404).send({'id': 43, 'code': 404, 'message': 'Not Found'});
	}
});

module.exports = router;
