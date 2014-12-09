(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && typeof define.amd === 'object') {
    define(['jquery'], function($) {
      return factory(root, $);
    });
  } else {
    root.ScrollAnimate = factory(root, root.jQuery || root.$);
  }
})(this, function(root, $) {
  'use strict';
