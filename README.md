## level-json-cache

Caching library with LevelDB backend and [english-time](http://github.com/azer/english-time) enabled interface.

```js
cache = require('level-json-cache')('foobar')

cache.set('foo', { span: 'eggs', 'bar': 314 }, '5 days', function (error) {
  if (error) throw error;

  cache.get('foo', function (error, foo) {
    if (error) throw error;

    console.log('foo in cache:', foo)
  })
})
```

Example Time Inputs:

* 1000
* 1 week 3 days
* 1 hour, 5 minutes and 15 seconds

Full Reference: [english-time](http://github.com/azer/english-time)

## Install

```bash
$ npm install level-cache
```

## Unlimited Caching

Pass -1 or 'never' to not define any expiration.

## Manually Invalidating

```js
cache.invalidate('whatever', function (){
  // done
});
```

## Destroying

```js
cache.destroy(function () {
  // done
});
```
