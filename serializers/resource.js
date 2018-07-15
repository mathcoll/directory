'use strict';
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

function ResourceTypeSerializer(resource) {
	this.serialize = function () {
		return new JSONAPISerializer('resource', {
			keyForAttribute: 'underscore_case',
			attributes: ['name', 'user_id', 'type', 'description', 'position', 'ipv4', 'ipv6', 'isPublic', 'longitude', 'latitude', 'meta', 'parameters'],
			topLevelLinks : {
				parent : sprintf('%s/v%s/objects', baseUrl_https, version),
				self : object.pageSelf!==undefined?sprintf('%s/v%s/objects/?page=%s&size=%s', baseUrl_https, version, object.pageSelf, object.size):undefined,
				first : object.pageFirst!==undefined?sprintf('%s/v%s/objects/?page=%s&size=%s', baseUrl_https, version, object.pageFirst, object.size):undefined,
				prev : object.pagePrev!==undefined?sprintf('%s/v%s/objects/?page=%s&size=%s', baseUrl_https, version, object.pagePrev, object.size):undefined,
				last : object.pageLast!==undefined?sprintf('%s/v%s/objects/?page=%s&size=%s', baseUrl_https, version, object.pageLast, object.size):undefined,
				next : object.pageNext!==undefined?sprintf('%s/v%s/objects/?page=%s&size=%s', baseUrl_https, version, object.pageNext, object.size):undefined,
			},
			dataLinks : {},
		}).serialize(resource);
	};
}

module.exports = ResourceTypeSerializer;