/*
 * Debug console filters
 * DEBUG
 * [gtm]
 * [indexedDB]
 * [JWT]
 * [History]
 * [Orientation]
 * [pushSubscription]
 * [ServiceWorker]
 * [setSection]
 */

var app = {
	api_version: 'v1.0.0',
	debug: false,
	baseUrl: '',
	baseUrlCdn: '',
	bearer: '',
	date_format: 'DD/MM/YYYY, HH:mm',
	cardMaxChars: 256,
	currentSection: 'index',
	tawktoid: '',
	applicationServerKey: '',
	sectionsPageTitles: {
		'index': 'directory',
	},
	offlineCard: {
		title: 'Offline',
		description: 'Offline mode, Please connect to internet in order to see your resources.'
	}
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function fetchStatusHandler(response) {
	if (response.status === 200 || response.status === 201) {
		return response;
	} else if (response.status === 400) {
		console.log("DEBUG", "Bad Request.");
		throw new Error("Bad Request.");
	} else if (response.status === 401 || response.status === 403) {
		throw new Error(response.statusText);
	} else if (response.status === 409) {
		console.log("DEBUG", "Revision is conflictual.");
		throw new Error("Revision is conflictual.");
	} else {
		throw new Error(response.statusText);
	}
}; // fetchStatusHandler

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.hash.substring(1)),
        sURLVariables = sPageURL.split('?'),
        sParameterName,
        i;
    //console.log("DEBUG", sPageURL);
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        //console.log("DEBUG", sParameterName);
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

(function() {
	'use strict';
	var appshell = new Appshell();

	var route = {
		path: '#/',
		before: function() {
			console.log("DEBUG", "before /");
			appshell.setContent("main.main", "home", "<section id='home'><div class='content'><div class='container-fluid'><div class='row'></div></div></div></section>");
			appshell.getHeader("#home div.row", {title: "Internet of Thing Directory", subtitle: "IoT websites, links, glossary, devices and sensors."});

			appshell.getH1("#home div.row", "Directory sections", "col-md-12");
			appshell.getCard("#home div.row", {title: "Websites", subtitle: "List Websites related to IoT.", type: 'websites', color: "success", icon: null, id: null, footer: {icon: "link", label: "Websites"}, url: "/#/types/websites"}, "col-md-4");
			appshell.getCard("#home div.row", {title: "Articles", subtitle: "IoT online usefull articles.", type: 'articles', color: "success", icon: null, id: null, footer: {icon: "link", label: "Articles"}, url: "/#/types/articles"}, "col-md-4");
			appshell.getCard("#home div.row", {title: "Sensors", subtitle: "Purchase sensors to build your own IoT.", type: 'sensors', color: "success", icon: null, id: null, footer: {icon: "usb", label: "Sensors"}, url: "/#/types/sensors"}, "col-md-4");
			appshell.getCard("#home div.row", {title: "Devices", subtitle: "Devices resources and links to get ones.", type: 'devices', color: "success", icon: null, id: null, footer: {icon: "devices", label: "Devices"}, url: "/#/types/devices"}, "col-md-4");
			appshell.getCard("#home div.row", {title: "Glossary", subtitle: "Glossary to understand all about your Things.", type: 'terms', color: "success", icon: null, id: null, footer: {icon: "title", label: "Terms"}, url: "/#/types/terms"}, "col-md-4");

			/*
			appshell.getCard("#home div.row", {title: "Home Card", subtitle: "Subtitle", type: null, color: "success", icon: null, id: '', footer: {icon: "info", link: "/#", label: "Action button"}}, "col-md-12");
			appshell.getCardStat("#home div.row", {title: "Statistics", subtitle: "Subtitle", type: null, color: "success", icon: "devices_other", id: '', footer: {icon: "info", link: "/#", label: "Action button"}}, "col-md-4");
			appshell.getCardStat("#home div.row", {title: "Statistics", subtitle: "Subtitle", type: null, color: "success", icon: "devices_other", id: '', footer: {icon: "info", link: "/#", label: "Action button"}}, "col-md-4");
			appshell.getCardStat("#home div.row", {title: "Statistics", subtitle: "Subtitle", type: null, color: "success", icon: "devices_other", id: '', footer: {icon: "info", link: "/#", label: "Action button"}}, "col-md-4");
			
			appshell.getH1("#home div.row", "Section 2", "col-md-12");
			appshell.getProfile("#home div.row", {profile: {image: '/img/opl_img.jpg', title: 'title', name: 'name name', description: 'Vivamus nec dolor et tellus pharetra suscipit. Fusce felis sem, gravida quis euismod non, lobortis a risus. Aenean pellentesque, nisi mollis consequat fringilla, dui metus iaculis eros, nec dictum urna elit laoreet purus. Etiam gravida sed lacus et dignissim. Ut laoreet dui ac tortor laoreet euismod.'}, id: '', footer: {icon: "info", label: "Action button"}, url: "/#" }, "col-md-6");
			appshell.getProfile("#home div.row", {profile: {image: '/img/opl_img.jpg', title: 'title', name: 'name name', description: 'Vivamus nec dolor et tellus pharetra suscipit. Fusce felis sem, gravida quis euismod non, lobortis a risus. Aenean pellentesque, nisi mollis consequat fringilla, dui metus iaculis eros, nec dictum urna elit laoreet purus. Etiam gravida sed lacus et dignissim. Ut laoreet dui ac tortor laoreet euismod.'}, id: '', footer: {icon: "info", label: "Action button"}, url: "/#" }, "col-md-6");
			
			appshell.getH1("#home div.row", "Section 3", "col-md-12");
			appshell.getCardStat("#home div.row", {title: "Statistics", subtitle: "Subtitle", type: null, color: "success", icon: "devices_other", id: '', footer: {icon: "info", link: "/#", label: "Action button"}}, "col-md-4");
			appshell.getCardStat("#home div.row", {title: "Statistics", subtitle: "Subtitle", type: null, color: "success", icon: "devices_other", id: '', footer: {icon: "info", link: "/#", label: "Action button"}}, "col-md-4");
			appshell.getCardStat("#home div.row", {title: "Statistics", subtitle: "Subtitle", type: null, color: "success", icon: "devices_other", id: '', footer: {icon: "info", link: "/#", label: "Action button"}}, "col-md-4");
			*/
			
		},
		on: function() {
			console.log("DEBUG", "on /");
		},
		after: function() {
			console.log("DEBUG", "after /");
		},
		config: {}
	}
	Router.add(route);
	
	var routeResources = {
		path: '#/resources',
		before: function() {
			console.log("DEBUG", "before /resources", getUrlParameter("label"));
			appshell.setContent("main.main", "resources", "<section id='resources'><div class='content'><div class='container-fluid'><div class='row'></div></div></div></section>");
			appshell.getH1("#resources div.row", "All Resources", "col-md-12");

			var myInit = { method: 'GET', headers: new Headers().append("Content-Type", "application/json") };
			var url = app.baseUrl+'/'+app.api_version+'/resources/';
			url += getUrlParameter("label")!=undefined?'?label='+getUrlParameter("label"):'';

			fetch(url, myInit)
			.then(
				fetchStatusHandler
			).then(function(fetchResponse){ 
				return fetchResponse.json();
			})
			.then(function(response) {
				for (var i=0; i < (response).length ; i++) {
					appshell.getCard("#resources div.row", {title: response[i].title!==null?response[i].title:'', subtitle: response[i].subtitle!==null?response[i].subtitle:'', type: response[i].type!==null?response[i].type:'', labels: response[i].labels!==null?response[i].labels:'', url: response[i].url!==null?response[i].url:'', color: response[i].color!==null?response[i].color:'', icon: response[i].icon!==null?response[i].icon:'', id: response[i].id!==null?response[i].id:'', footer: {icon: "link", label: 'www', link: response[i].url!==null?response[i].url:'', ext: true}}, response[i].col!==null?response[i].col:'');
				}
				this.task.done(response);
			})
			.catch(function (error) {
				this.task.done('error'+error);
			});
			
		},
		on: function() {
			console.log("DEBUG", "on /resources");
		},
		after: function() {
			console.log("DEBUG", "after /resources");
		},
		config: {}
	}
	Router.add(routeResources);
	
	var routeTypes = {
		path: '#/types',
		before: function() {
			console.log("DEBUG", "before /types", getUrlParameter("label"));
			appshell.setContent("main.main", "types", "<section id='types'><div class='content'><div class='container-fluid'><div class='row'></div></div></div></section>");
			appshell.getH1("#types div.row", "Resource types", "col-md-12");
			
			appshell.getCard("#types div.row", {title: "Websites", subtitle: "List Websites related to IoT.", type: 'websites', color: "success", icon: null, id: null, footer: {icon: "bookmarks", label: "Websites"}, url: "/#/types/websites"}, "col-md-4");
			appshell.getCard("#types div.row", {title: "Articles", subtitle: "IoT online usefull articles.", type: 'articles', color: "success", icon: null, id: null, footer: {icon: "notes", label: "Articles"}, url: "/#/types/articles"}, "col-md-4");
			appshell.getCard("#types div.row", {title: "Sensors", subtitle: "Purchase sensors to build your own IoT.", type: 'sensors', color: "success", icon: null, id: null, footer: {icon: "usb", label: "Sensors"}, url: "/#/types/sensors"}, "col-md-4");
			appshell.getCard("#types div.row", {title: "Devices", subtitle: "Devices resources and links to get ones.", type: 'devices', color: "success", icon: null, id: null, footer: {icon: "devices", label: "Devices"}, url: "/#/types/devices"}, "col-md-4");
			appshell.getCard("#types div.row", {title: "Glossary", subtitle: "Glossary to understand all about your Things.", type: 'terms', color: "success", icon: null, id: null, footer: {icon: "title", label: "Terms"}, url: "/#/types/terms"}, "col-md-4");

		},
		on: function() {
			console.log("DEBUG", "on /types");
		},
		after: function() {
			console.log("DEBUG", "after /types");
		},
		config: {}
	}
	Router.add(routeTypes);
	
	var routeResourceTypes = {
		path: '#/types/:type',
		before: function() {
			console.log("DEBUG", "before #/types/:type", this.params.type, getUrlParameter("label"));
			appshell.setContent("main.main", "type", "<section id='type'><div class='content'><div class='container-fluid'><div class='row'></div></div></div></section>");
			
			if ( this.params.type == "websites" || this.params.type == "articles" || this.params.type == "sensors" || this.params.type == "devices" || this.params.type == "terms" ) {
				if ( !getUrlParameter("label") ) {
					appshell.getH1("#type div.row", "All "+(this.params.type).capitalize(), "col-md-12");
				} else {
					appshell.getH1("#type div.row", (this.params.type).capitalize()+" on \""+getUrlParameter("label")+"\"", "col-md-12");
				}

				var myInit = { method: 'GET', headers: new Headers().append("Content-Type", "application/json") };
				var url = app.baseUrl+'/'+app.api_version+'/'+this.params.type+'/';
				url += getUrlParameter("label")!=undefined?'?label='+getUrlParameter("label"):'';
				
				fetch(url, myInit)
				.then(
					fetchStatusHandler
				).then(function(fetchResponse){ 
					return fetchResponse.json();
				})
				.then(function(response) {
					for (var i=0; i < (response).length ; i++ ) {
						appshell.getCard("#type div.row", {title: response[i].title, subtitle: response[i].subtitle, type: response[i].type!==null?response[i].type:'', labels: response[i].labels, url: response[i].url, color: response[i].color, icon: response[i].icon, id: response[i].id, footer: {icon: "link", label: "www", link: response[i].url, ext: true}}, response[i].col);
					}
					this.task.done(response);
				})
				.catch(function (error) {
					this.task.done('error'+error);
				});
				
			} else {
				appshell.getCard("#type div.row", {title: "Error", subtitle: "Not Authorized", color: "danger", icon: "error"}, "col-md-12");
			}

		},
		on: function() {
			console.log("DEBUG", "on #/types/:type");
		},
		after: function() {
			console.log("DEBUG", "after #/types/:type");
		},
		config: {}
	}
	Router.add(routeResourceTypes);
	
	var routeLabels = {
		path: '#/labels',
		before: function() {
			console.log("DEBUG", "before /labels", getUrlParameter("label"));
			appshell.setContent("main.main", "labels", "<section id='labels'><div class='content'><div class='container-fluid'><div class='row'></div></div></div></section>");
			appshell.getH1("#labels div.row", "Labels", "col-md-12");
			appshell.getCard("#labels div.row", {title: "Labels", subtitle: "Subtitle", color: "success", icon: null}, "col-md-12");

		},
		on: function() {
			console.log("DEBUG", "on /labels");
		},
		after: function() {
			console.log("DEBUG", "after /labels");
		},
		config: {}
	}
	Router.add(routeLabels);


	//init rule with onRouteChange
	var onChangeRoute = function(route) {
		//console.log("DEBUG", "onChangeRoute", route);
	};
	Router.init(onChangeRoute);
})();



/*!
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
!function e(t, n, o) {
  function r(a, s) {
    if (!n[a]) {
      if (!t[a]) {
        var u = 'function' == typeof require && require;
        if (!s && u) return u(a, !0);
        if (i) return i(a, !0);
        var l = new Error('Cannot find module \'' + a + '\'');
        throw l.code = 'MODULE_NOT_FOUND',
        l
      }
      var c = n[a] = {
        exports: {
        }
      };
      t[a][0].call(c.exports, function (e) {
        var n = t[a][1][e];
        return r(n ? n : e)
      }, c, c.exports, e, t, n, o)
    }
    return n[a].exports
  }
  for (var i = 'function' == typeof require && require, a = 0; a < o.length; a++) r(o[a]);
  return r
}({
  1: [
    function (e, t, n) {
      'use strict';
      function o(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
      }
      var r = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            'value' in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n),
          o && e(t, o),
          t
        }
      }();
      Object.defineProperty(n, '__esModule', {
        value: !0
      });
      var i = function () {
        function e() {
          o(this, e),
          this.loader = document.querySelector('.js-global-loader'),
          this.mainContainer = document.querySelector('.js-global-main')
        }
        return r(e, [
          {
            key: 'onUpdate',
            value: function (e) {
              console.log('onUpdate: ', this.path, e),
              this.loader.classList.add('is-hidden')
            }
          },
          {
            key: 'onStart',
            value: function (e) {
              var t = this;
              console.log('onStart: ', e),
              this.loader.classList.add('is-hidden'),
              this.updateNavDrawer(e)
            }
          },
          {
            key: 'onFinish',
            value: function () {
              console.log('onFinish: ', this.path)
            }
          },
          {
            key: 'show404',
            value: function () {
              var e = document.createElement('h1');
              e.textContent = '404.',
              this.mainContainer.appendChild(e);
              var t = document.createElement('p');
              t.textContent = 'Oops - looks like this page isn\'t valid.',
              this.mainContainer.appendChild(t)
            }
          },
          {
            key: 'showError',
            value: function (e) {
              var t = document.createElement('h1');
              t.textContent = 'Ooopps.',
              this.mainContainer.appendChild(t);
              var n = document.createElement('p');
              n.textContent = 'There was a problem displaying this page , sorry about that.',
              this.mainContainer.appendChild(n)
            }
          },
          {
            key: 'updateNavDrawer',
            value: function (e) {
              var t = document.querySelectorAll('.side-nav__body a');
              [
              ].forEach.call(t, function (e) {
                e.classList.remove('active'),
                e.href === document.location.href && e.classList.add('active')
              })
            }
          }
        ]),
        e
      }();
      n['default'] = i
    },
    {
    }
  ],
  2: [
    function (e, t, n) {
      'use strict';
      function o(e) {
        return e && e.__esModule ? e : {
          'default': e
        }
      }
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
      }
      function i(e, t) {
        if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return !t || 'object' != typeof t && 'function' != typeof t ? e : t
      }
      function a(e, t) {
        if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t)  : e.__proto__ = t)
      }
      Object.defineProperty(n, '__esModule', {
        value: !0
      });
      var s = e('./Controller'),
      u = o(s),
      l = e('../libs/RouterSingleton'),
      c = o(l),
      f = e('./ActivityController'),
      d = o(f),
      v = e('./../view/NavDrawerView'),
      h = o(v),
      p = function (e) {
        function t() {
          r(this, t);
          var e = i(this, Object.getPrototypeOf(t).call(this)),
          n = new h['default'],
          o = document.querySelector('.js-toggle-menu');
          o.addEventListener('click', function () {
            n.toggle()
          });
          for (var a = n.sideNavContent.querySelectorAll('a'), s = 0; s < a.length; s++) a[s].href && a[s].addEventListener('click', function (e) {
            e.preventDefault(),
            n.close();
            var t = c['default'].getRouter();
            t.goToPath(e.target.href)
          });
          var u = c['default'].getRouter();
          return u.addRoute('/', new d['default']),
          u.addRoute('/url-1', new d['default']),
          u.addRoute('/url-2', new d['default']),
          u.setDefaultRoute(new d['default']),
          u.requestStateUpdate(),
          e
        }
        return a(t, e),
        t
      }(u['default']);
      n['default'] = p
    },
    {
      '../libs/RouterSingleton': 5,
      './../view/NavDrawerView': 7,
      './ActivityController': 1,
      './Controller': 3
    }
  ],
  3: [
    function (e, t, n) {
      'use strict';
      function o(e) {
        return e && e.__esModule ? e : {
          'default': e
        }
      }
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
      }
      var i = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            'value' in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n),
          o && e(t, o),
          t
        }
      }();
      Object.defineProperty(n, '__esModule', {
        value: !0
      });
      var a = e('../libs/ToasterSingleton'),
      s = o(a),
      u = function () {
        function e() {
          r(this, e);
          var t = arguments.length <= 0 || void 0 === arguments[0] ? !0 : arguments[0];
          t && this.registerServiceWorker()
        }
        return i(e, [
          {
            key: 'registerServiceWorker',
            value: function () {
              'serviceWorker' in navigator && navigator.serviceWorker.register('/service-worker.js', {
                scope: '/'
              }).then(function (e) {
                console.log('Service worker is registered.');
                var t = !1;
                e.active && (t = !0),
                e.onupdatefound = function (n) {
                  console.log('A new Service Worker version has been found...'),
                  e.installing.onstatechange = function (e) {
                    'installed' === this.state && (t ? s['default'].getToaster().toast('App updated. Restart for the new version.')  : s['default'].getToaster().toast('App ready for offline use.'))
                  }
                }
              }) ['catch'](function (e) {
                console.log('Unable to register service worker.', e)
              })
            }
          },
          {
            key: 'loadScript',
            value: function (e) {
              return new Promise(function (t, n) {
                var o = document.createElement('script');
                o.async = !0,
                o.src = e,
                o.onload = t,
                o.onerror = n,
                document.head.appendChild(o)
              })
            }
          },
          {
            key: 'loadCSS',
            value: function (e) {
              return new Promise(function (t, n) {
                var o = new XMLHttpRequest;
                o.open('GET', e),
                o.responseType = 'text',
                o.onload = function (e) {
                  if (200 === this.status) {
                    var r = document.createElement('style');
                    r.textContent = o.response,
                    document.head.appendChild(r),
                    t()
                  } else n()
                },
                o.send()
              })
            }
          }
        ]),
        e
      }();
      n['default'] = u
    },
    {
      '../libs/ToasterSingleton': 6
    }
  ],
  4: [
    function (e, t, n) {
      'use strict';
      function o(e) {
        return e && e.__esModule ? e : {
          'default': e
        }
      }
      var r = e('./controller/ApplicationController'),
      i = o(r);
      new i['default']
    },
    {
      './controller/ApplicationController': 2
    }
  ],
  5: [
    function (e, t, n) {
      'use strict';
      function o(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
      }
      var r = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            'value' in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n),
          o && e(t, o),
          t
        }
      }();
      Object.defineProperty(n, '__esModule', {
        value: !0
      });
      var i = function () {
        function e() {
          o(this, e)
        }
        return r(e, null, [
          {
            key: 'getRouter',
            value: function () {
              return 'undefined' != typeof window.RouterInstance_ ? window.RouterInstance_ : (window.RouterInstance_ = new a, window.RouterInstance_)
            }
          }
        ]),
        e
      }();
      n['default'] = i;
      var a = function () {
        function e() {
          var t = this;
          o(this, e),
          this.routes = {
          },
          this.currentPath = null,
          this.defaultActivity = null,
          window.addEventListener('popstate', function (e) {
            t.onPopState(e)
          })
        }
        return r(e, [
          {
            key: 'addRoute',
            value: function (e, t) {
              if (this.routes[e]) throw 'A handler already exists for this path: ' + e;
              this.routes[e] = t
            }
          },
          {
            key: 'setDefaultRoute',
            value: function (e) {
              if (this.defaultActivity) throw 'A default handler already exists';
              this.defaultActivity = e
            }
          },
          {
            key: 'removeRoute',
            value: function (e) {
              this.routes[e] && delete this.routes[e]
            }
          },
          {
            key: 'requestStateUpdate',
            value: function () {
              var e = this;
              requestAnimationFrame(function () {
                e.manageState()
              })
            }
          },
          {
            key: 'manageState',
            value: function () {
              var e = document.location.pathname,
              t = this.routes[e],
              n = this.routes[this.currentPath];
              return !t && this.defaultActivity && (t = this.defaultActivity),
              this.currentPath === e ? 'function' == typeof t.onUpdate ? (t.onUpdate(), !0)  : !1 : (n && n.onFinish(), t ? (t.onStart(e), this.currentPath = e)  : this.currentPath = null, !0)
            }
          },
          {
            key: 'goToPath',
            value: function (e) {
              var t = this,
              n = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
              console.log('goToPath() path = ' + e),
              Router.navigate(e),
              e !== window.location.pathname && (history.pushState(void 0, n, e), requestAnimationFrame(function () {
                t.manageState()
              }))
            }
          },
          {
            key: 'onPopState',
            value: function (e) {
              e.preventDefault(),
              this.requestStateUpdate()
            }
          }
        ]),
        e
      }()
    },
    {
    }
  ],
  6: [
    function (e, t, n) {
      'use strict';
      function o(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
      }
      var r = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            'value' in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n),
          o && e(t, o),
          t
        }
      }();
      Object.defineProperty(n, '__esModule', {
        value: !0
      });
      var i = function () {
        function e() {
          o(this, e)
        }
        return r(e, null, [
          {
            key: 'getToaster',
            value: function () {
              return 'undefined' != typeof window.ToasterInstance_ ? window.ToasterInstance_ : (window.ToasterInstance_ = new a, window.ToasterInstance_)
            }
          }
        ]),
        e
      }();
      n['default'] = i;
      var a = function () {
        function e() {
          o(this, e),
          this.view = document.querySelector('.js-toast-view'),
          this.hideTimeout = 0
        }
        return r(e, [
          {
            key: 'toast',
            value: function (e) {
              var t = this;
              this.view.textContent = e,
              this.view.classList.add('toast-view--visible'),
              clearTimeout(this.hideTimeout),
              this.hideTimeout = setTimeout(function () {
                t.hide()
              }, 3000)
            }
          },
          {
            key: 'hide',
            value: function () {
              this.view.classList.remove('toast-view--visible')
            }
          }
        ]),
        e
      }()
    },
    {
    }
  ],
  7: [
    function (e, t, n) {
      'use strict';
      function o(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
      }
      var r = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            'value' in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n),
          o && e(t, o),
          t
        }
      }();
      Object.defineProperty(n, '__esModule', {
        value: !0
      });
      var i = function () {
        function e() {
          var t = this;
          o(this, e),
          this.rootElement = document.querySelector('.js-side-nav'),
          this.sideNavContent = this.rootElement.querySelector('.js-side-nav-content');
          var n,
          r,
          i = function (e) {
            n = e.touches[0].pageX
          },
          a = function (e) {
            var o = e.touches[0].pageX;
            r = Math.min(0, o - n),
            0 > r && e.preventDefault(),
            t.sideNavContent.style.transform = 'translateX(' + r + 'px)'
          },
          s = function (e) {
            - 1 > r && t.closeSideNav()
          };
          this.rootElement.addEventListener('click', function () {
            t.close()
          }),
          this.sideNavContent.addEventListener('click', function (e) {
            e.stopPropagation()
          }),
          this.sideNavContent.addEventListener('touchstart', i),
          this.sideNavContent.addEventListener('touchmove', a),
          this.sideNavContent.addEventListener('touchend', s)
        }
        return r(e, [
          {
            key: 'isOpen',
            value: function () {
              return this.rootElement.classList.contains('side-nav--visible')
            }
          },
          {
            key: 'toggle',
            value: function () {
              this.isOpen() ? this.close()  : this.open()
            }
          },
          {
            key: 'close',
            value: function () {
              this.rootElement.classList.remove('side-nav--visible'),
              this.sideNavContent.classList.add('side-nav__content--animatable'),
              this.sideNavContent.style.transform = 'translateX(-102%)'
            }
          },
          {
            key: 'open',
            value: function () {
              var e = this;
              this.rootElement.classList.add('side-nav--visible');
              var t = function n(t) {
                e.sideNavContent.tabIndex = 0,
                e.sideNavContent.focus(),
                e.sideNavContent.removeAttribute('tabIndex'),
                e.sideNavContent.classList.remove('side-nav__content--animatable'),
                e.sideNavContent.removeEventListener('transitionend', n)
              };
              this.sideNavContent.classList.add('side-nav__content--animatable'),
              this.sideNavContent.addEventListener('transitionend', t),
              requestAnimationFrame(function () {
                e.sideNavContent.style.transform = 'translateX(0px)'
              })
            }
          }
        ]),
        e
      }();
      n['default'] = i
    },
    {
    }
  ]
}, {
}, [
  4
]);