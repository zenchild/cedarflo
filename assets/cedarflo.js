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
  exports["default"] = Ember.HTMLBars.template({ "id": "rMxJr1YT", "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Dear friends and neighbors,\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"We would like to welcome you to another Cedarflo Angus production\\nsale. The year has presented lemons, you will find lemonade in the\\noffering. Calving ease with performance has always been our mantra,\\nwe aim to please. A large number of our animals are recommended for\\nheifers. Our sires have been selected for not only calving ease but\\ntheir exceptional maternal traits, females first, that’s what makes\\na herd.\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Diverse genetics are the backbone to healthy, performance cattle.\\nIt’s the same reason you don’t go to the family reunion looking for\\na date. Line breeding will produce per-formance cattle, but they have\\nrepercussions. Dad always said, line breeding will produce the best\\nand the worst. We want to be solid, not extreme. Our philosophy is to\\nimprove upon the previous generation, it keeps us moving forward. We\\nhope you find confidence in our diverse genetics and will find a\\nplace for them in your program.\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"These animals are ready to perform. As always, every animal sold\\nis guaranteed to be a breeder. Please reference our guarantee in the\\nsale catalog, it’s straightforward and fair. Let us know if you feel\\notherwise. Dad said that when he bought a bull and it didn’t work out\\nhe didn’t feel like credit in a future sale or a pick of the\\nleftovers satisfied his immediate need. We agree. We want you to know\\nthat we appreciate your business. Feedback on our animals is always\\nwelcome.\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"The animals can be viewed at the ranch anytime until Monday Feb. 20,\\nat which time they will be transported to Lemmon Livestock. They can be\\nviewed there until sale time. We hope you can find the time to inspect\\nthem before the sale. We fully understand if you’ve got snow to push,\\nheifers to calve or just need 20 minutes on the couch before the next\\nbusiness calls. If you’re not able to attend please watch/bid online at\\n\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://cattleusa.com\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"cattleusa.com\"],[\"close-element\"],[\"text\",\".\\nInstructions are on \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://www.lemmonlivestock.com\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"lemmonlivestock.com\"],[\"close-element\"],[\"text\",\".\\nIf you have questions, please contact us and we will do our best to help. You\\ncan also bid by phone either through the sale barn or by contacting us\\nahead of time. Ultrasound and yearling data will be distributed sale\\nday or right here on our \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/assets/sale-catalog.pdf\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"website\"],[\"close-element\"],[\"text\",\".\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"I’ve referenced a few \\\"Dad said ...\\\" in previous paragraphs.\\nFortunately, it’s not just catch phrases but ideals that stick with us.\\nAs most may know, unfortunately Dave (Dad) is no longer with us.\\nSomeday cancer won’t mean pain, fraility and the end. Here’s to that\\nday. Dad ran Cedarflo Angus with honesty, determination and to the best\\nof his ability. Never a social person, he let his actions and cattle\\nspeak for themselves. However, he could bend your ear for an hour if\\nyou ventured on our place. Dad told me last May that the only thing he\\nwanted to do was \\\"... see this place to the end.\\\" Hopefully he’s still\\nwatching because we’re not done yet.\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"See you sale day,\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Jeremy Fordahl\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "cedarflo/templates/-welcome.hbs" } });
});
define("cedarflo/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "JqBgyHcH", "block": "{\"statements\":[[\"open-element\",\"script\",[]],[\"static-attr\",\"type\",\"text/javascript\"],[\"flush-element\"],[\"text\",\"\\n\\n  var _gaq = _gaq || [];\\n  _gaq.push(['_setAccount', 'UA-17233322-4']);\\n  _gaq.push(['_setDomainName', '.cedarfloangus.com']);\\n  _gaq.push(['_trackPageview']);\\n\\n  (function() {\\n   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;\\n   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';\\n   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);\\n   })();\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"main\"],[\"flush-element\"],[\"comment\",\" Main starts here \"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"header\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"logo\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logo-new.png\"],[\"static-attr\",\"alt\",\"\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"menu\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"menu--main\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"home\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"index\"],null,4],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"photos\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"photos\"],null,3],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"history\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"history\"],null,2],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"contact\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"index\"],null,1],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"sale\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sale\"],null,0],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"clear\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"content\"],[\"flush-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"welcome\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/road_home.png\"],[\"static-attr\",\"alt\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Cedarflo Angus Ranch\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"main--description\"],[\"flush-element\"],[\"text\",\"\\n        Welcome to CedarfloAngus.com. Have a look through the Sale information and if you have any questions please don't hesitate to contact us.\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"sale-poster\"],[\"flush-element\"],[\"text\",\"\\n        Check out the 2017 \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/assets/sale-poster.pdf\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"Sale Poster\"],[\"close-element\"],[\"text\",\" and \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/assets/sale-catalog.pdf\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"Catalog\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"strong\",[]],[\"static-attr\",\"style\",\"font-weight: bold;\"],[\"flush-element\"],[\"text\",\"Sale Date:\"],[\"close-element\"],[\"text\",\" \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"Wednesday February 22, 2017 at Noon\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"clear\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"hr\",[]],[\"static-attr\",\"class\",\"dotted\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"footer\"],[\"flush-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"contact-us\"],[\"flush-element\"],[\"text\",\"Contact Us\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"clear\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"left\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"contact-heading\"],[\"flush-element\"],[\"text\",\"Address:\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"address\"],[\"flush-element\"],[\"text\",\"\\n          Cedarflo Angus Ranch\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"1305 6th St. NE\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" Hettinger, ND 58639\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"right\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"contact-heading\"],[\"flush-element\"],[\"text\",\"Phone:\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"(701) 567-4222\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"contact-heading\"],[\"flush-element\"],[\"text\",\"Email:\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"cedarflo@ndsupernet.com\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"copyright\"],[\"flush-element\"],[\"text\",\"Copyright 2017 Cedarflo Angus\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"comment\",\" Main ends here \"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"2017 Sale Info\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/bull-icon.png\"],[\"static-attr\",\"alt\",\"\"],[\"flush-element\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"contact us\"]],\"locals\":[]},{\"statements\":[[\"text\",\"history\"]],\"locals\":[]},{\"statements\":[[\"text\",\"photos\"]],\"locals\":[]},{\"statements\":[[\"text\",\"home\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "cedarflo/templates/application.hbs" } });
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
  exports["default"] = Ember.HTMLBars.template({ "id": "DirrcnAD", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"sale-page\"],[\"flush-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"sale-page--downloads\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"\\n      Downloadable Spreadsheet Data\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/assets/yearling-info.xlsx\"],[\"flush-element\"],[\"text\",\"Yearling Info\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/assets/ultrasound-info.xlsx\"],[\"flush-element\"],[\"text\",\"Ultrasound Info\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/assets/beef-value-info.xlsx\"],[\"flush-element\"],[\"text\",\"Beef Value Info\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"article\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"articleContent\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"partial\",\"welcome\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":true}", "meta": { "moduleName": "cedarflo/templates/sale.hbs" } });
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
  require("cedarflo/app")["default"].create({"name":"cedarflo","version":"0.0.0+f35b1aa6"});
}

/* jshint ignore:end */
//# sourceMappingURL=cedarflo.map
