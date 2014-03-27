define("touch-mixin", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var hammer = Hammer;

    /**
     * The TouchMixin implements gestures from HammerJS.
     * For full documentation on how to use the gestures, please see
     * [the HammerJS documentation](https://github.com/EightMedia/hammer.js/wiki/Getting-Started)
     *
     * ## Usage:
     * 1) Set up the `gesture` property. This needs to be an array of HammerJS gestures.
     *
     * Example:
     * ```
     * gestures: ['tap', 'touch', 'release', 'drag']
     * ```
     *
     * Gestures as methods are called on the `Ember.run` loop:
     * ```
     * drag: function(e) {
     *  // called within `Ember.run`
     * }
     * ```
     *
     * However, if you are listening to the gesture, you will need to handle the run loop manually:
     * ```
     * handleDrag(e) {
     *   Ember.run(function() {
     *     // code
     *   });
     * }.on('drag', 'touch', 'release')
     *```
     *
     * @class TouchMixin
     * @uses Ember.Evented
     * @extends Ember.Mixin
     * @requires HammerJS
     */

    var TouchMixin = Ember.Mixin.create(Ember.Evented, {
      _defaultGestures: ['touch', 'drag', 'release', 'tap', 'doubletap'],

      /**
       * These are the HammerJS gestures to register with the component / view.
       *
       * @property {Array} gestures
       */
      gestures: Ember.computed.defaultTo('_defaultGestures'),

      /**
       * Defers the setup so that the component/view has a chance to pass in custom options before
       * `setupTouchGestures` is called. This must call explicitly call `setupTouchGestures`.
       *
       * @method deferredSetup
       * @return {Promise}
       */
      deferredSetup: null,

      /**
       * Sets up the touch gestures acquired from the `gesture` array. This should be called
       * on `didInsertElement`.
       *
       * (Optional) If there are selectors that you do not want interfering with the view / component,
       * such as overlaying buttons, you can pass in those selectors to the `ignore` options property.
       *
       * Example:
       * ```
       * this.setupTouchGestures({
       *   ignore: ['.carousel-btn', '.carousel-dots']
       * });
       * ```
       *
       * @method setupTouchGestures
       * @param {Object} options to pass in
       */
       setupTouchGestures: function(options) {
         var target = this;
         var $this = this.$();
         var el = $this[0];
         var hjsInstance = target.get('_hjsInstance');

         options = options || {};

         this.get('gestures').forEach(function(gesture) {
           hjsInstance.on(gesture, Ember.$.proxy(target._delegateEvent, target));

           if (options.ignore) {
             var selectors = buildSelector(options.ignore);

             target.set('_ignoreSelectors', selectors);

             $this.find(selectors).on(gesture, function(e) {
               return target.stifle(e);
             });
           }
         });

         return true;
       },

      /**
       * Tears down any gestures found in the `gesture` array. This is automatically called
       * on `willDestroyElement`.
       *
       * @method teardownTouchGestures
       */
       teardownTouchGestures: function() {
         var target = this;
         var $this = this.$();
         var el = $this[0];
         var hjsInstance = target.get('_hjsInstance');

         this.get('gestures').forEach(function(gesture) {
           hjsInstance.off(gesture, target._delegateEvent);
         });

         $this.find(target.get('_ignoreSelectors')).off();

       }.on('willDestroyElement'),

      /**
       * Prevents an event/gesture from completing its default action and stops propagation.
       *
       * @function stifle
       * @param {Event} the event/gesture to stifle
       */
      stifle: function(event) {
        if (!event) return false;

        try {
          event.stopImmediatePropagation();
          if (event.gesture) event.gesture.stopPropagation();
        }
        catch(err) {
          event.stopPropagation();
          event.propagationStopped = true;
        }

        event.preventDefault();
        if (event.gesture) event.gesture.preventDefault();

        return false;
      },

      _delegateEvent: function(e) {
        var method = this[e.type];

        if (method) {
          Ember.run(this, method, e);
        }

        this.trigger(e.type, e);
      },

      _decideDeferredSetup: function() {
        this.set('_hjsInstance', hammer(this.$()[0]));
        return this.deferredSetup && this.deferredSetup() || this.setupTouchGestures();
      }.on('didInsertElement'),

      _handleFrozenGestures: function() {
        if (this.get('isFrozen')) {
          this.get('_hjsInstance').enable(false);
        }
        else {
          this.get('_hjsInstance').enable(true);
        }
      }.observes('isFrozen'),

      _ignoreSelectors: null,

      _hjsInstance: null
    });

    function buildSelector(array) {
      var selectors = '';

      array.forEach(function(selector) {
        selectors += selectors ? ', ' + selector : selector;
      });

      return selectors;
    }

    __exports__["default"] = TouchMixin;
  });