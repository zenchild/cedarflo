"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('cedarflo/app', ['exports', 'ember', 'cedarflo/resolver', 'ember-load-initializers', 'cedarflo/config/environment'], function (exports, _ember, _cedarfloResolver, _emberLoadInitializers, _cedarfloConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _cedarfloConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _cedarfloConfigEnvironment['default'].podModulePrefix,
    Resolver: _cedarfloResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _cedarfloConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('cedarflo/components/slide-show', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['slide-show'],
    index: 0,

    previousPhoto: _ember['default'].computed('photos', 'index', function () {
      return this._getPhoto(this.get('index') - 1);
    }),

    currentPhoto: _ember['default'].computed('photos', 'index', function () {
      return this._getPhoto(this.get('index'));
    }),

    nextPhoto: _ember['default'].computed('photos', 'index', function () {
      return this._getPhoto(this.get('index') + 1);
    }),

    _getPhoto: function _getPhoto(idx) {
      var photosLength = this.get('photos.length');

      if (idx === -1) {
        return this.get('photos')[photosLength - 1];
      } else if (idx >= photosLength) {
        return this.get('photos')[0];
      } else {
        return this.get('photos')[idx];
      }
    },

    actions: {
      incrementPhotos: function incrementPhotos() {
        var maxIdx = this.get('photos.length') - 1;
        var curIdx = this.get('index');

        if (curIdx === maxIdx) {
          this.set('index', 0);
        } else {
          this.set('index', curIdx + 1);
        }
      },

      decrementPhotos: function decrementPhotos() {
        var maxIdx = this.get('photos.length') - 1;
        var curIdx = this.get('index');

        if (curIdx === 0) {
          this.set('index', maxIdx);
        } else {
          this.set('index', curIdx - 1);
        }
      }

    }

  });
});
define('cedarflo/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('cedarflo/helpers/app-version', ['exports', 'ember', 'cedarflo/config/environment'], function (exports, _ember, _cedarfloConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _cedarfloConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('cedarflo/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('cedarflo/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('cedarflo/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'cedarflo/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _cedarfloConfigEnvironment) {
  var _config$APP = _cedarfloConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('cedarflo/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('cedarflo/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('cedarflo/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('cedarflo/initializers/export-application-global', ['exports', 'ember', 'cedarflo/config/environment'], function (exports, _ember, _cedarfloConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_cedarfloConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _cedarfloConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_cedarfloConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('cedarflo/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('cedarflo/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('cedarflo/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("cedarflo/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('cedarflo/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('cedarflo/router', ['exports', 'ember', 'cedarflo/config/environment'], function (exports, _ember, _cedarfloConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _cedarfloConfigEnvironment['default'].locationType,
    rootURL: _cedarfloConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('photos');
    this.route('history');
    this.route('sale');
    this.route('welcome');
  });

  exports['default'] = Router;
});
define("cedarflo/routes/application", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({

    activate: function activate() {
      document.title = "Cedarflo Angus Ranch";
    }

  });
});
define('cedarflo/routes/history', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('cedarflo/routes/photos', ['exports', 'ember'], function (exports, _ember) {

  var photos = [{
    url: '/assets/photos/dave-05.jpg',
    caption: "In Loving Memory of Dave Fordahl, husband, father and one of God's most dedicated cattleman.<br /><br />May 26, 1952 - June 14, 2016"
  }, {
    url: '/assets/photos/dave-01.jpg',
    caption: 'Although Dave has left us, his legacy lives on.'
  }, {
    url: '/assets/photos/dave-02.jpg'
  }, {
    url: '/assets/photos/dave-03.jpg'
  }, {
    url: '/assets/photos/dave-04.jpg'
  }, {
    url: '/assets/photos/dave-06.jpg'
  }, {
    url: '/assets/photos/dave-07.jpg'
  }, {
    url: '/assets/photos/dave-08.jpg'
  }, {
    url: '/assets/photos/dave-09.jpg'
  }];

  exports['default'] = _ember['default'].Route.extend({

    model: function model() {
      return photos;
    }

  });
});
define('cedarflo/routes/sale', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('cedarflo/routes/welcome', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('cedarflo/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("cedarflo/templates/-welcome", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ihvVj+FB", "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Welcome friends and neighbors,\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Another year in the books, we hope it treated you well. Green pastures and astounding beef prices sure do make things easier. We appreciate the opportunity to service your future genetic needs. Our seedstock selections have always been consistent, moderate framed, calving ease with the potential to grow. We are confident in this philosophy and in the animals being offered.\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"As usual, the animals were raised on mothers milk and grass, not creep fed. The calves were weaned at the end of September and started on a ration of hay and silage supplemented with grain. We try to keep the ration as moderate as possible to ensure structural soundness and present an animal that is ready to work come spring.\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"One question that seems to get asked every year. What makes a heifer bull a heifer bull? This is a question that will be debated until the end of time. Every producer has their own criteria when searching for a heifer bull to put to work in their herd. We would like to explain the heifer bull designation so that you can cross reference our position with your own. At Cedarflo Angus we use several sources of information before giving the heifer bull title. First we consider the wealth of information provided by the American Angus Association. The animal must have appropriate EPD’s such as a low BW and higher CED (Calving Ease Direct). Second we look for a lower actual birth weight and how the animal stacks up structurally. Third consideration is heredity. Does the lineage support calving ease, not just sire but dam’s progeny birth record is considered. If these qualifiers point in the same direction we will list the animal as \\\"Should work on heifers.\\\" Hopefully this brief explanation puts us on the same page and provides a level of confidence in the heifer bull designation. Just as we alluded to before, everyones criteria is different, now at least you know ours. Questions? Please don’t hesitate to ask.\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"As always, we invite you to view the animals at the ranch until Monday February 23rd at which time they will be taken to Lemmon Livestock. Yearling and ultrasound information will be available sale day and on our website, \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://www.cedarfloangus.com\"],[\"flush-element\"],[\"text\",\"www.cedarfloangus.com\"],[\"close-element\"],[\"text\",\", as soon as possible. If you have any questions please don’t hesitate to contact us. We look forward to visiting with you.\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"If you’re not able to make it sale day you can watch and bid online at \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://www.lemmonlivestock.com\"],[\"flush-element\"],[\"text\",\"www.lemmonlivestock.com\"],[\"close-element\"],[\"text\",\". They have instructions for CattleUSA.com, their online bidding service. Bids will also be taken by phone sale day. If you have questions about either the online bidding process or by phone please make sure to contact us ahead of time, we will do our best to guide you through the process.\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Thank you for giving us here at Cedarflo Angus the opportunity to service your sire and/or seedstock needs. We look forward to seeing you sale day.\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Dave and Carol Fordahl  701-567-4222\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\nJeremy and Jennifer Fordahl   701-567-6440\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "cedarflo/templates/-welcome.hbs" } });
});
define("cedarflo/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "PYiPcEUe", "block": "{\"statements\":[[\"open-element\",\"script\",[]],[\"static-attr\",\"type\",\"text/javascript\"],[\"flush-element\"],[\"text\",\"\\n\\n  var _gaq = _gaq || [];\\n  _gaq.push(['_setAccount', 'UA-17233322-4']);\\n  _gaq.push(['_setDomainName', '.cedarfloangus.com']);\\n  _gaq.push(['_trackPageview']);\\n\\n  (function() {\\n   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;\\n   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';\\n   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);\\n   })();\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"main\"],[\"flush-element\"],[\"comment\",\" Main starts here \"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"header\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"logo\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logo.png\"],[\"static-attr\",\"alt\",\"\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"menu\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"menu--main\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"home\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"index\"],null,4],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"photos\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"photos\"],null,3],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"history\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"history\"],null,2],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"contact\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"index\"],null,1],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"sale\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sale\"],null,0],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"clear\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"content\"],[\"flush-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"welcome\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/road_home.png\"],[\"static-attr\",\"alt\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Cedarflo Angus Ranch\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"main--description\"],[\"flush-element\"],[\"text\",\"\\n        Welcome to CedarfloAngus.com. Have a look through the Sale information and if you have any questions please don't hesitate to contact us.\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"sale-poster\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/assets/sale-poster.pdf\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"2017 Sale Poster\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"clear\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"hr\",[]],[\"static-attr\",\"class\",\"dotted\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"footer\"],[\"flush-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"contact-us\"],[\"flush-element\"],[\"text\",\"Contact Us\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"clear\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"left\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"contact-heading\"],[\"flush-element\"],[\"text\",\"Address:\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"address\"],[\"flush-element\"],[\"text\",\"\\n          Cedarflo Angus Ranch\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"1305 6th St. NE\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" Hettinger, ND 58639\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"right\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"contact-heading\"],[\"flush-element\"],[\"text\",\"Phone:\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"(701) 567-4222\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"contact-heading\"],[\"flush-element\"],[\"text\",\"Email:\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"cedarflo@ndsupernet.com\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"copyright\"],[\"flush-element\"],[\"text\",\"Copyright 2017 Cedarflo Angus\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"comment\",\" Main ends here \"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"2017 Sale Info\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/bull-icon.png\"],[\"static-attr\",\"alt\",\"\"],[\"flush-element\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"contact us\"]],\"locals\":[]},{\"statements\":[[\"text\",\"history\"]],\"locals\":[]},{\"statements\":[[\"text\",\"photos\"]],\"locals\":[]},{\"statements\":[[\"text\",\"home\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "cedarflo/templates/application.hbs" } });
});
define("cedarflo/templates/components/slide-show", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "pU2NnZyH", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"photos--controls\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"decrementPhotos\"],null],null],[\"flush-element\"],[\"text\",\"☚\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"photos--current\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"photos--current-wrapper\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"currentPhoto\",\"url\"]],null],[\"modifier\",[\"action\"],[[\"get\",[null]],\"incrementPhotos\"]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"currentPhoto\",\"caption\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"photos--controls\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"incrementPhotos\"],null],null],[\"flush-element\"],[\"text\",\"☛\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"photos--caption\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"photos--caption-content\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"unknown\",[\"currentPhoto\",\"caption\"]],true],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"clear\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "cedarflo/templates/components/slide-show.hbs" } });
});
define("cedarflo/templates/history", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "R25HG3oI", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"article\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"articleContent\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/ranch.jpg\"],[\"static-attr\",\"class\",\"photo\"],[\"static-attr\",\"border\",\"0\"],[\"static-attr\",\"width\",\"278\"],[\"static-attr\",\"height\",\"161\"],[\"static-attr\",\"align\",\"right\"],[\"static-attr\",\"style\",\"padding-left: 10px;\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n    Cedarflo Angus Ranch originated from a few registered Angus cows that my grandfather, Albert and my father, Norval purchased in 1948. A bull (Dakotas Black Jess) was purchased at the 1949 Valley City Winter Show. The cows and bull were purchased under the name, Albert H. Fordahl & Sons, who raised and sold breeding stock by private treaty for many years. Then upon the retirement of my grandfather in 1979, Carol and I purchased an interest in the herd. The name was changed to Cedarflo Angus Ranch as the Cedar River flows directly through the middle of the ranch located in north central Adams County. When my father, Norval, passed away in the spring of 1994, we purchased the rest of the herd and have since strived to continue the standards set by the preceding generations.\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n    The closed cow herd has always been maintained to promote genetics that keep easy calving, strong maternal traits, higher weaning weights, mild temperaments, and easy fleshing in the forefront. In trying to do this, I feel that we have cattle that will compliment and work in anyone's herds. We have been performance testing since 1968, selecting top end bulls through artificial insemination since 1979, using computerized record keeping since 1993, and the last few years we have been ultrasounding for carcass traits. Each step has been an improvement in our end product, the animals that go on to work in your herds.\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n    Directions to the ranch are: 7 miles east of Hettinger to the Junction of US 12 & ND 8 (Haynes Jct.), then 13 miles north to 14th Ave. NE, 3 miles west and 1/2 mile south. The coffee pot is always on so feel free to stop and visit!\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"center\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/fordahls.jpg\"],[\"static-attr\",\"class\",\"photo\"],[\"static-attr\",\"border\",\"0\"],[\"static-attr\",\"width\",\"400\"],[\"static-attr\",\"height\",\"300\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"caption\"],[\"flush-element\"],[\"text\",\"\\n      The Fordahl Family.  Tracy, Steven, Jeremy, Carol and Dave Fordahl.  Tracy and her family live in Bismarck, Steve goes to school in North Carolina and Jeremy farms and ranches with us, making him the fourth generation Fordahl to return to the farm.\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "cedarflo/templates/history.hbs" } });
});
define("cedarflo/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Mjsb4P+Q", "block": "{\"statements\":[[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "cedarflo/templates/index.hbs" } });
});
define("cedarflo/templates/photos", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "WEJhmdpr", "block": "{\"statements\":[[\"append\",[\"helper\",[\"slide-show\"],null,[[\"photos\"],[[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "cedarflo/templates/photos.hbs" } });
});
define("cedarflo/templates/sale", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "DZs6F6jo", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"article\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"articleContent\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"placeholder\"],[\"flush-element\"],[\"text\",\"\\n      2017 sale info is forthcoming.\\n\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/assets/sale-poster.pdf\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"Sale Poster\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "cedarflo/templates/sale.hbs" } });
});
define("cedarflo/templates/welcome", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "/r8S7zWh", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"article\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"articleContent\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"partial\",\"welcome\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":true}", "meta": { "moduleName": "cedarflo/templates/welcome.hbs" } });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('cedarflo/config/environment', ['ember'], function(Ember) {
  var prefix = 'cedarflo';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("cedarflo/app")["default"].create({"name":"cedarflo","version":"0.0.0+234444ee"});
}

/* jshint ignore:end */
//# sourceMappingURL=cedarflo.map
