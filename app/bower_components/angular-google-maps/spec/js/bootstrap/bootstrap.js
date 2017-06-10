
/*globals angular,_,inject */

(function() {
  beforeEach(function() {
    this.googleTemp = window.google;
    angular.module('uiGmapgoogle-maps').config(function($provide) {
      $provide.value('$log', console);
      return $provide.decorator('$timeout', function($delegate, $browser) {
        $delegate.hasPendingTasks = function() {
          return $browser.deferredFns.length > 0;
        };
        return $delegate;
      });
    });
    angular.module('uiGmapgoogle-maps.specs', ['uiGmapgoogle-maps']);
    module("uiGmapgoogle-maps.specs");
    this.injectAll = (function(_this) {
      return function() {
        return _this.injects.forEach(function(toInject) {
          return inject(toInject);
        });
      };
    })(this);
    this.injects = [];
    this.injects.push((function(_this) {
      return function(_$rootScope_, $timeout, $q, $browser, $compile, uiGmapPropMap) {
        window.PropMap = uiGmapPropMap;
        _this.q = $q;
        _this.browser = $browser;
        _this.rootScope = _$rootScope_;
        _this.scope = angular.extend(_this.rootScope.$new(), _this.scope || {});
        _this.scope.map = angular.extend(_this.scope.map || {}, {
          zoom: 12,
          center: {
            longitude: 47,
            latitude: -27
          }
        });
        _this.timeout = $timeout;
        return _this.compile = $compile;
      };
    })(this));
    return this.digest = (function(_this) {
      return function(fn, doCompile) {
        if (doCompile == null) {
          doCompile = true;
        }
        if (_this.html && _this.scope && doCompile) {
          _this.compile(_this.html)(_this.scope);
        }
        if ((fn != null) && _.isFunction(fn)) {
          fn();
        }
        while (_this.timeout.hasPendingTasks()) {
          _this.timeout.flush();
        }
        return _this.rootScope.$digest();
      };
    })(this);
  });

  afterEach(function() {
    if (this.googleTemp != null) {
      return window.google = this.googleTemp;
    }
  });

}).call(this);
