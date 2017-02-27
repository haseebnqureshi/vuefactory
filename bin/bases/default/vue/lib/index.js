'use strict';

var $ = require('jquery');
var _ = require('underscore');
var cookies = require('js-cookie');
var config = require('./config.json');

var ajax = {
	filters: {
		always: function(options) {
			var options = options || {};
			options = this.setUrl(options);

			if (!options.cookieHeaders) { options.cookieHeaders = []; }
			if (!_.isArray(options.cookieHeaders)) {
				options.cookieHeaders = [options.cookieHeaders];
			}

			_.each(options.cookieHeaders, headerCookie => {
				options = this.addCookieAsHeader(options, headerCookie.cookieName, headerCookie.headerName);
			});

			return options;
		},
		addCookieAsHeader: function(options, cookieName, headerName) {
			var options = options || {};
			if (!headerName) { return options; }
			if (!options.headers) { options.headers = {}; }
			var value = cookies.get(cookieName || '') || '';
			options.headers[headerName] = value;
			return options;
		},
		setUrl: function(options) {
			var options = options || {};
			if (options.url) { return options; }
			if (options.resource && config.API_ENDPOINT) {
				options.url = config.API_ENDPOINT + options.resource;
			}
			return options;
		},
	},	
	utils: {

		// cache is really concerned only with get requests
		cache: {

		},
		clearCache: function(url) {

			//if url is not cached, we have nothing to do
			if (!_.has(this.cache, url)) { return; }

			/*
			If we have the url cached, we simply update its 
			last run time to now, thereby falling inside our 
			cache interval window.
			*/

			this.saveIntoCache(url);
		},
		getCachedItem: function(url) {
			return this.cache[url];
		},
		isCached: function(url) {
			return _.has(this.cache, url);
		},
		run: function(options) {
			var options = options || {};
			if (options.type === 'get') {
				if (!this.shouldRun(options)) { return; }
			}
			return $.ajax(options);
		},
		saveIntoCache: function(url) {
			this.cache[url] = new Date().getTime();
		},
		shouldRun: function(options) {
			if (!options.url || options.url == '') { return false; }
			var url = options.url;

			//see if we've cached this before
			if (this.isCached(url)) {

				//check if it's past keepAlive time 
				var keepAlive = 5 * 60 * 60 * 1000; //5 min
				var now = new Date().getTime();
				var lastRun = this.getCachedItem(url);

				//if within range, return should not run
				if ((now - lastRun) < keepAlive) { return false; }

				//otherwise, should run and update our cache
				else { 
					this.saveIntoCache(url);
					return true; 
				}
			}

			//if we've never cached this before 
			else {

				//we should run our request and update our cache
				this.saveIntoCache(url);
				return true;
			}
		}
	},
	get: function(options /* url or resource, success */) {
		var options = this.filters.always(options || {});
		options.type = 'get';
		return this.utils.run(options);
	},
	post: function(options /* url or resource, data, success */) {
		var options = this.filters.always(options || {});
		options.type = 'post';
		if (!options.data) { options.data = {}; }
		return this.utils.run(options);
	},
	put: function(options /* url or resource, data, success */) {
		var options = this.filters.always(options || {});
		options.type = 'put';
		if (!options.data) { options.data = {}; }
		return this.utils.run(options);
	},
	delete: function(options /* url or resource, success */) {
		var options = this.filters.always(options || {});
		options.type = 'delete';
		return this.utils.run(options);
	}
};

module.exports = { $, _, cookies, config, ajax };
