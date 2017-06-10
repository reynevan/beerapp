(function() {
  window.uiGmapInitiator = {
    initDirective: function(testSuite, apiSubjectClassName, thingsToInit) {
      var injects;
      if (thingsToInit == null) {
        thingsToInit = ['initAll'];
      }
      injects = ['uiGmapLogger'];
      if (apiSubjectClassName != null) {
        injects.push('uiGmap' + apiSubjectClassName);
      }
      module("uiGmapgoogle-maps.mocks");
      inject(function(GoogleApiMock) {
        testSuite.apiMock = new GoogleApiMock();
        return thingsToInit.forEach(function(init) {
          return testSuite.apiMock[init]();
        });
      });
      injects.push(function(Logger, SubjectClass) {
        if (SubjectClass != null) {
          testSuite.subject = new SubjectClass();
        }
        testSuite.log = Logger;
        return spyOn(testSuite.log, 'error');
      });
      testSuite.injects.push(injects);
      return testSuite;
    },
    initMock: function(testSuite, injectedCb) {
      var apiMock, app;
      app = window.module("uiGmapgoogle-maps.mocks");
      window.module("uiGmapgoogle-maps.directives.api.utils");
      apiMock = void 0;
      testSuite.injects.push(function(GoogleApiMock) {
        apiMock = new GoogleApiMock();
        apiMock.initAll();
        if ((injectedCb != null) && _.isFunction(injectedCb)) {
          return injectedCb(apiMock);
        }
      });
      return {
        app: app,
        apiMock: apiMock
      };
    }
  };

}).call(this);
