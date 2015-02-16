(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && typeof define.amd === 'object') {
    define(['jquery'], function($) {
      return factory(root, $);
    });
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root, root.jQuery || root.$);
  } else {
    root.ScrollAnimate = factory(root, root.jQuery || root.$);
  }
})(this, function(root, $) {
  'use strict';

  // Browserify
  if (typeof module !== "undefined" && module.exports && typeof $ === 'undefined') {
    $ = require('jquery');
  }
