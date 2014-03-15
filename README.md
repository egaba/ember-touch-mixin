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

### Usage
Set up the `gesture` property. This needs to be an array of HammerJS gestures, but defaults to `['tap', 'doubletap', 'touch', 'release', 'drag']`.

Example:
```
gestures: ['tap', 'touch', 'release', 'drag']
```

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

### Contributing
Clone this repo: `git@github.com:brandingbrand/ember-touch-mixin.git`

Install and link to Bower:
```
npm install && bower install
bower link
```

In your project, link to the local repo:
```
bower link ember-touch-mixin
```

After you make your edits, create a `dist` build:
```
gulp
```
