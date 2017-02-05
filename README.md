# PubSub ES2015
- Micro Pub/Sub library written in ES2015
- Simple and fast
- Supports namespaced events
- Zero dependency
- Only 0.3KB (min + gzip)
- ES5 version is also available (Translated with Babal)


## Usage
### Basic
``` javascript
// subscribe
pubsub.sub('myEvent', () => {
  console.log('Called!');
});

// publish
pubsub.pub('myEvent'); // logs 'Called!'

// unsubscribe
pubsub.unsub('myEvent');
```

### Arguments
You can use any number of arguments.
``` javascript
pubsub.sub('myEvent', (a, b, c) => {
  console.log(a, b, c);
});

pubsub.pub('myEvent', 1, 2, 3, 4); // 1, 2, 3
pubsub.pub('myEvent', 5, 6); // 5, 6, undefined
```

### This
By default, `this` in callback functions point the global object.
``` javascript
pubsub.sub('myEvent', function () {
  console.log(this); // window
});

// bind
pubsub.sub('myEvent', function () {
  console.log(this); // myObj
}.bind(myObj));

// arrow functions
pubsub.sub('myEvent', () => {
  console.log(this); // the execution context
});
```

### Namespaced events
jQuery-style namespacing (Works like CSS classes)
Add `.namespace` after event types.
``` javascript
pubsub.sub('myEvent', () => { console.log(1); });
pubsub.sub('myEvent.foo', () => { console.log(2); });
pubsub.sub('myEvent.bar', () => { console.log(3); });
pubsub.sub('myEvent.foo.bar', () => { console.log(4); });
pubsub.sub('myEvent.bar.foo', () => { console.log(5); });
pubsub.sub('anotherEvent', () => { console.log(6); });
pubsub.sub('anotherEvent.foo', () => { console.log(7); });
pubsub.sub('.foo', () => { console.log(8); });

pubsub.pub('myEvent'); // 1, 2, 3, 4, 5
pubsub.pub('myEvent.foo'); //  2, 4, 5
pubsub.pub('myEvent.bar'); // 3, 4, 5
pubsub.pub('myEvent.foo.bar'); // 4, 5
pubsub.pub('myEvent.bar.foo'); // 4, 5
pubsub.pub('anotherEvent'); // 6, 7
pubsub.pub('anotherEvent.foo'); // 7
pubsub.pub('.foo'); // none
```


Unsubscribe an event type
``` javascript
pubsub.sub('myEvent', () => { console.log(1); });
pubsub.sub('myEvent.foo', () => { console.log(2); });
pubsub.sub('myEvent.bar', () => { console.log(3); });
pubsub.sub('myEvent.foo.bar', () => { console.log(4); });
pubsub.sub('myEvent.bar.foo', () => { console.log(5); });
pubsub.sub('anotherEvent', () => { console.log(6); });
pubsub.sub('anotherEvent.foo', () => { console.log(7); });
pubsub.sub('.foo', () => { console.log(8); });

pubsub.unsub('myEvent');

pubsub.pub('myEvent'); // none
pubsub.pub('myEvent.foo'); // none
pubsub.pub('myEvent.bar'); // none
pubsub.pub('myEvent.foo.bar'); // none
pubsub.pub('myEvent.bar.foo'); // none
pubsub.pub('anotherEvent'); // 6, 7
pubsub.pub('anotherEvent.foo'); // 7
pubsub.pub('.foo'); // none
```


Unsubscribe an event type with a namespace
``` javascript
pubsub.sub('myEvent', () => { console.log(1); });
pubsub.sub('myEvent.foo', () => { console.log(2); });
pubsub.sub('myEvent.bar', () => { console.log(3); });
pubsub.sub('myEvent.foo.bar', () => { console.log(4); });
pubsub.sub('myEvent.bar.foo', () => { console.log(5); });
pubsub.sub('anotherEvent', () => { console.log(6); });
pubsub.sub('anotherEvent.foo', () => { console.log(7); });
pubsub.sub('.foo', () => { console.log(8); });

pubsub.unsub('myEvent.foo');

pubsub.pub('myEvent'); // 1, 3
pubsub.pub('myEvent.foo'); // none
pubsub.pub('myEvent.bar'); // 3
pubsub.pub('myEvent.foo.bar'); // none
pubsub.pub('myEvent.bar.foo'); // none
pubsub.pub('anotherEvent'); // 6, 7
pubsub.pub('anotherEvent.foo'); // 7
pubsub.pub('.foo'); // none
```


Unsubscribe a namespace
``` javascript
pubsub.sub('myEvent', () => { console.log(1); });
pubsub.sub('myEvent.foo', () => { console.log(2); });
pubsub.sub('myEvent.bar', () => { console.log(3); });
pubsub.sub('myEvent.foo.bar', () => { console.log(4); });
pubsub.sub('myEvent.bar.foo', () => { console.log(5); });
pubsub.sub('anotherEvent', () => { console.log(6); });
pubsub.sub('anotherEvent.foo', () => { console.log(7); });
pubsub.sub('.foo', () => { console.log(8); });

pubsub.unsub('.foo');

pubsub.pub('myEvent'); // 1, 3
pubsub.pub('myEvent.foo'); // none
pubsub.pub('myEvent.bar'); // 3
pubsub.pub('myEvent.foo.bar'); // none
pubsub.pub('myEvent.bar.foo'); // none
pubsub.pub('anotherEvent'); // 6
pubsub.pub('anotherEvent.foo'); // none
pubsub.pub('.foo'); // none
```


Unsubscribe all events
``` javascript
pubsub.sub('myEvent', () => { console.log(1); });
pubsub.sub('myEvent.foo', () => { console.log(2); });
pubsub.sub('myEvent.bar', () => { console.log(3); });
pubsub.sub('myEvent.foo.bar', () => { console.log(4); });
pubsub.sub('myEvent.bar.foo', () => { console.log(5); });
pubsub.sub('anotherEvent', () => { console.log(6); });
pubsub.sub('anotherEvent.foo', () => { console.log(7); });
pubsub.sub('.foo', () => { console.log(8); });

pubsub.unsub('');

pubsub.pub('myEvent'); // none
pubsub.pub('myEvent.foo'); // none
pubsub.pub('myEvent.bar'); // none
pubsub.pub('myEvent.foo.bar'); // none
pubsub.pub('myEvent.bar.foo'); // none
pubsub.pub('anotherEvent'); // none
pubsub.pub('anotherEvent.foo'); // none
pubsub.pub('.foo'); // none
```
