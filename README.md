# Ember TouchMixin

The TouchMixin implements gestures from HammerJS.
For full documentation on how to use the gestures, please see
[the HammerJS documentation](https://github.com/EightMedia/hammer.js/wiki/Getting-Started)

### Installation
1) Install the package
```
bower install ember-touch-mixin -S
```

2) Place `./dist/main.js` into a script tag.
```
<script src="/bower_components/ember-touch-mixin/dist/main.js"></script>
```

## Usage:
1) Set up the `gesture` property. This needs to be an array of HammerJS gestures.

Example:
```
gestures: ['tap', 'touch', 'release', 'drag']
```

2) Call `setupTouchGestures` in a `didInsertElement` hook.

Event teardown is automatically invoked on `willDestroyElement`. There is no need to call
`teardownTouchGestures` unless you're implementing `Ember.Freezable`.

Gestures as methods are called on the `Ember.run` loop:
```
drag: function(e) {
 // called within `Ember.run`
}
```

However, if you are listening to the gesture, you will need to handle the run loop manually:
```
handleDrag(e) {
  Ember.run(function() {
    // code
  });
}.on('drag', 'touch', 'release')
```
