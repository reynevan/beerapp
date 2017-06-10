(function() {
  describe('Polyline Mock', function() {
    var subject;
    subject = null;
    beforeEach(function() {
      module("uiGmapgoogle-maps.mocks");
      return inject(function(GoogleApiMock) {
        var apiMock;
        apiMock = new GoogleApiMock();
        subject = apiMock.getPolyline();
        return subject.resetInstances();
      });
    });
    it('constructor exists', function() {
      return expect(subject).toBeDefined();
    });
    return it('can create exists', function() {
      var poly;
      poly = new subject();
      expect(poly).toBeDefined();
      return expect(subject.instances).toBe(1);
    });
  });

}).call(this);
