var newIO = require("level-json");
var englishTime = require("english-time");
var info = require("local-debug")('info');
var trace = require("local-debug")('trace');

module.exports = newCache;

function newCache (name) {
  var path = './' + name;
  var io = newIO(path);

  info('Defining new cache set "%s"', name);

  return {
    io: io,
    destroy: io.destroy,
    get: get,
    set: set,
    invalidate: invalidate
  };

  function get (key, callback) {
    trace('Returning %s', key);

    io.get(key, function (error, record) {
      if (error) return callback(error);

      if (record.length != -1 && record.ts + record.length <= Date.now()) {
        invalidate(key, function (error) {
          if (error) return callback(error);
          callback(new Error(key + ' has been expired.'));
        });
        return;
      };

      callback(undefined, record.content);
    });
  }

  function invalidate (key, callback) {
    trace('Invalidating %s', key);
    io.del(key, callback);
  }

  function set (key, content, length, callback) {
    length == 'never' && ( length = -1 );

    if (typeof length == 'string') {
      length = englishTime(length);
    }

    var record = {
      ts: Date.now(),
      length: length,
      content: content
    };

    trace('Setting %s for %d', key, length);

    io.set(key, record, callback);
  }
}
