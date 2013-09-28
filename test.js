var newCache = require("./");
var cacheA;
var cacheB;

beforeEach(clean);
afterEach(clean);

it('gets and sets a cache item', function(done){
  cacheA = newCache('cache-a');

  cacheA.set('foo', { foo: true }, -1, function (error) {
    if (error) return done(error);

    cacheA.get('foo', function (error, content) {
      expect(error).to.not.exist;
      expect(content.foo).to.be.true;
      done();
    });
  });

});

it('sets a cache item expires after a sec', function(done){
  cacheA = newCache('cache-a');

  cacheA.set('foo', { foo: true, expiresAfter: 900 }, 900, function (error) {
    if (error) return done(error);

    cacheA.get('foo', function (error, content) {
      expect(error).to.not.exist;
      expect(content.foo).to.be.true;
      expect(content.expiresAfter).to.equal(900);

      setTimeout(function () {
        cacheA.get('foo', function (error, content) {
          expect(error).to.exist;
          expect(content).to.not.exist;
          done();
        });
      }, 1000);

    });
  });
});

it('sets a cache item expires after a sec', function(done){
  cacheA = newCache('cache-a');

  cacheA.set('foo', { foo: true, expiresAfter: 400 }, '300 milliseconds', function (error) {
    if (error) return done(error);

    cacheA.get('foo', function (error, content) {
      expect(error).to.not.exist;
      expect(content.foo).to.be.true;
      expect(content.expiresAfter).to.equal(400);

      setTimeout(function () {
        cacheA.get('foo', function (error, content) {
          expect(error).to.exist;
          expect(content).to.not.exist;
          done();
        });
      }, 400);

    });
  });
});

function clean (done) {
  var a = cacheA || newCache('cache-a');
  var b = cacheB || newCache('cache-b');

  a.destroy(function () {
    b.destroy(done);
  });
}
