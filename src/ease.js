/* @flow */
/************************************************
 * @file  Easing Functions
 * @author Isaac Suttell
 ************************************************/

/**
 * Utility PI Var
 *
 * @const
 * @type    {Number}
 */
var PI2 = Math.PI * 2;

/**
 * Make it public so anyone can add their own
 *
 * @type    {Object}
 */
var Ease = {};

/**
 * Linear Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.Linear = function(percent, initial, change) {
  return percent * change + initial;
};

/**
 * QuadIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuadIn = function(percent, initial, change) {
  return change * (percent /= 1) * percent + initial;
};

/**
 * QuadOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuadOut = function(percent, initial, change) {
  return -change * (percent /= 1) * (percent - 2) + initial;
};

/**
 * QuadInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuadInOut = function(percent, initial, change) {
  if ((percent /= 1 / 2) < 1) {
    return change / 2 * percent * percent + initial;
  }
  return -change / 2 * ((--percent) * (percent - 2) - 1) + initial;
};

/**
 * CubicIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.CubicIn = function(percent, initial, change) {
  return change * (percent /= 1) * percent * percent + initial;
};

/**
 * CubicOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.CubicOut = function(percent, initial, change) {
  return change * ((percent = percent / 1 - 1) * percent * percent + 1) + initial;
};

/**
 * CubicInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.CubicInOut = function(percent, initial, change) {
  if ((percent /= 1 / 2) < 1) {
    return change / 2 * percent * percent * percent + initial;
  }
  return change / 2 * ((percent -= 2) * percent * percent + 2) + initial;
};

/**
 * QuartIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuartIn = function(percent, initial, change) {
  return change * (percent /= 1) * percent * percent * percent + initial;
};

/**
 * QuartOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuartOut = function(percent, initial, change) {
  return -change * ((percent = percent / 1 - 1) * percent * percent * percent - 1) + initial;
};

/**
 * QuartInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuartInOut = function(percent, initial, change) {
  if ((percent /= 1 / 2) < 1) {
    return change / 2 * percent * percent * percent * percent + initial;
  }
  return -change / 2 * ((percent -= 2) * percent * percent * percent - 2) + initial;
};

/**
 * QuintIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuintIn = function(percent, initial, change) {
  return change * (percent /= 1) * percent * percent * percent * percent + initial;
};

/**
 * QuintOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuintOut = function(percent, initial, change) {
  return change * ((percent = percent / 1 - 1) * percent * percent * percent * percent + 1) + initial;
};

/**
 * QuintInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuintInOut = function(percent, initial, change) {
  if ((percent /= 1 / 2) < 1) {
    return change / 2 * percent * percent * percent * percent * percent + initial;
  }
  return change / 2 * ((percent -= 2) * percent * percent * percent * percent + 2) + initial;
};

/**
 * SineIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.SineIn = function(percent, initial, change) {
  return -change * Math.cos(percent / 1 * (Math.PI / 2)) + change + initial;
};

/**
 * SineOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.SineOut = function(percent, initial, change) {
  return change * Math.sin(percent / 1 * (Math.PI / 2)) + initial;
};

/**
 * SineInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.SineInOut = function(percent, initial, change) {
  return -change / 2 * (Math.cos(Math.PI * percent / 1) - 1) + initial;
};

/**
 * ExpoIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.ExpoIn = function(percent, initial, change) {
  return (percent === 0) ? initial : change * Math.pow(2, 10 * (percent / 1 - 1)) + initial;
};

/**
 * ExpoOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.ExpoOut = function(percent, initial, change) {
  return (percent === 1) ? initial + change : change * (-Math.pow(2, -10 * percent / 1) + 1) + initial;
};

/**
 * ExpoInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.ExpoInOut = function(percent, initial, change) {
  if (percent === 0) {
    return initial;
  }
  if (percent === 1) {
    return initial + change;
  }
  if ((percent /= 1 / 2) < 1) {
    return change / 2 * Math.pow(2, 10 * (percent - 1)) + initial;
  }
  return change / 2 * (-Math.pow(2, -10 * --percent) + 2) + initial;
};

/**
 * CircIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.CircIn = function(percent, initial, change) {
  return -change * (Math.sqrt(1 - (percent /= 1) * percent) - 1) + initial;
};

/**
 * CircOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.CircOut = function(percent, initial, change) {
  return change * Math.sqrt(1 - (percent = percent / 1 - 1) * percent) + initial;
};

/**
 * CircInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.CircInOut = function(percent, initial, change) {
  if ((percent /= 1 / 2) < 1) {
    return -change / 2 * (Math.sqrt(1 - percent * percent) - 1) + initial;
  }
  return change / 2 * (Math.sqrt(1 - (percent -= 2) * percent) + 1) + initial;
};

// DRY
function elasticHelper(a, s, p, change) {
  if (a < Math.abs(change)) {
    a = change;
    s = p / 4;
  } else {
    s = p / PI2 * Math.asin(change / a);
  }
  return {
    a:a,
    s:s
  };
}

// DRY
function elasticReturn(a, percent, s, p, initial, mod) {
  return mod * (a * Math.pow(2, 10 * (percent -= 1)) * Math.sin((percent * 1 - s) * PI2 / p)) + initial;
}

/**
 * ElasticIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.ElasticIn = function(percent, initial, change) {
  var s = 1.70158;
  var p = 0;
  var a = change;
  if (percent === 0) {
    return initial;
  }
  if (percent === 1) {
    return initial + change;
  }
  if (!p) {
    p = 1 * 0.3;
  }
  var h = elasticHelper(a, s, p, change);
  return elasticReturn(h.a, percent, h.s, p, initial, -1);
};

/**
 * ElasticOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.ElasticOut = function(percent, initial, change) {
  var s = 1.70158;
  var p = 0;
  var a = change;
  if (percent === 0) {
    return initial;
  }
  if (percent === 1) {
    return initial + change;
  }
  if (!p) {
    p = 1 * 0.3;
  }
  var h = elasticHelper(a, s, p, change);
  return h.a * Math.pow(2, -10 * percent) * Math.sin((percent * 1 - h.s) * PI2 / p) + change + initial;
};

/**
 * ElasticInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.ElasticInOut = function(percent, initial, change) {
  var s = 1.70158;
  var p = 0;
  var a = change;
  if (percent === 0) {
    return initial;
  }
  if ((percent /= 1 / 2) === 2) {
    return initial + change;
  }
  if (!p) {
    p = 1 * (0.3 * 1.5);
  }
  var h = elasticHelper(a, s, p, change);
  if (percent < 1) {
    return elasticReturn(h.a, percent, h.s, p, initial, -0.5);
    // return -0.5 * (h.a * Math.pow(2, 10 * (percent -= 1)) * Math.sin((percent * 1 - h.s) * PI2 / p)) + initial;
  }
  return h.a * Math.pow(2, -10 * (percent -= 1)) * Math.sin((percent * 1 - h.s) * PI2 / p) * 0.5 + change + initial;
};

/**
 * BounceIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.BounceIn = function(percent, initial, change) {
  return change - Ease.BounceOut(1 - percent, 0, change) + initial;
};

/**
 * BounceOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.BounceOut = function(percent, initial, change) {
  if ((percent /= 1) < (1 / 2.75)) {
    return change * (7.5625 * percent * percent) + initial;
  } else if (percent < (2 / 2.75)) {
    return change * (7.5625 * (percent -= (1.5 / 2.75)) * percent + 0.75) + initial;
  } else if (percent < (2.5 / 2.75)) {
    return change * (7.5625 * (percent -= (2.25 / 2.75)) * percent + 0.9375) + initial;
  } else {
    return change * (7.5625 * (percent -= (2.625 / 2.75)) * percent + 0.984375) + initial;
  }
};

/**
 * BounceInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.BounceInOut = function(percent, initial, change) {
  if (percent < 1 / 2) {
    return Ease.BounceIn(percent * 2, 0, change) * 0.5 + initial;
  }
  return Ease.BounceOut(percent * 2 - 1, 0, change) * 0.5 + change * 0.5 + initial;
};
