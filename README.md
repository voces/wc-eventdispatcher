
# WC EventDispatcher

Simple, concise, ES2015 EventDispatcher. Targeted for WebCraft, but can work alone.

## Installation

```bash
$ npm install --save wc-eventemitter
```

## Documentation

```addEventListener( types, listener )```
- `types` : string || RegExp || [ ...string || RegExp ]. Strings with spaces are split into arrays.
- `listener` : function. Callback that is invoked.

```hasEventListener( type, listener )```
- `type`: string. RegExp listeners cannot be checked.
- `listener`: function.

```removeEventListener( type, listener )```
- `type`: string || [ ...string ]. RegExp listeners cannot be removed.
- `listener`: function.

```dispatchEvent( type, event, ...args )```
- `type`: string. If first argument is not a string, `event.type` is used.
- `event`: object. `.type` and `.target` are always overridden.
- `args`: *. Additional values that can be passed to listeners.

### Example

```javascript
import EventEmitter from "./node_modules/wc-eventdispatcher/src/EventDispatcher.js";

class Example extends EventEmitter {};

const example = new Example();

example.addEventListener( "one two three", e => console.log( e.type, e ) );

example.dispatchEvent( "one", { foo: "bar" } );
> "one" { foo: "bar", type: "one", target: <Example> }

```