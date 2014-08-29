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
This is automatically registered with your application as `touch-mixin`. Here is some example usage with a project set up with ES6 modules:
```js
import TouchMixin from 'touch-mixin';

var Carousel = Ember.View.extend(TouchMixin, {
  gestures: ['tap', 'doubletap', 'drag'],
  
  tap: function(e) {
    // `e` returns the HammerJS event
  },
  
  doubletap: function(e) {
    // code
  },
  
  drag: function(e) {
    // code
  }
});

export default Carousel;
```

1) Import this as a mixin for any View or Component.

2) Set up the `gesture` property. This needs to be an array of HammerJS gestures, but defaults to `['tap', 'doubletap', 'touch', 'release', 'drag']`.

3a) Place code within the gesture; the gesture is now registered as a method. This is called within the `Ember.run` loop:
```
drag: function(e) {
 // called within `Ember.run`
}
```

3b) However, if you are listening to the gesture, you will need to handle the run loop manually:
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
npm install
bower link
```

In your project, link to the local repo:
```
bower link ember-touch-mixin
```

Run `gulp` to watch and compile your assets as you make edits:
```
gulp
```
