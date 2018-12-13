'use strict';

// this file is the test262 test suite automatically generated by the tool

// Copyright (C) 2017 Ecma International. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: |
    Collection of assertion functions used throughout test262
---*/

var Test262Error = Error;

var $ERROR;
$ERROR = function $ERROR(message) {
  throw new Test262Error('Test262Error: ' + message);
};

function assert(mustBeTrue, message) {
  if (mustBeTrue === true) {
    return;
  }

  if (message === undefined) {
    message = 'Expected true but got ' + String(mustBeTrue);
  }
  $ERROR(message);
}

assert._isSameValue = function(a, b) {
  if (a === b) {
    // Handle +/-0 vs. -/+0
    return a !== 0 || 1 / a === 1 / b;
  }

  // Handle NaN vs. NaN
  return a !== a && b !== b;
};

assert.sameValue = function(actual, expected, message) {
  if (assert._isSameValue(actual, expected)) {
    return;
  }

  if (message === undefined) {
    message = '';
  } else {
    message += ' ';
  }

  message += 'Expected SameValue(«' + String(actual) +
    '», «' + String(expected) + '») to be true';

  $ERROR(message);
};

assert.notSameValue = function(actual, unexpected, message) {
  if (!assert._isSameValue(actual, unexpected)) {
    return;
  }

  if (message === undefined) {
    message = '';
  } else {
    message += ' ';
  }

  message += 'Expected SameValue(«' + String(actual) +
    '», «' + String(unexpected) + '») to be false';

  $ERROR(message);
};

assert.throws = function(expectedErrorConstructor, func, message) {
  if (typeof func !== 'function') {
    $ERROR('assert.throws requires two arguments: the error constructor ' +
      'and a function to run');
    return;
  }
  if (message === undefined) {
    message = '';
  } else {
    message += ' ';
  }

  try {
    func();
  } catch (thrown) {
    if (typeof thrown !== 'object' || thrown === null) {
      message += 'Thrown value was not an object!';
      $ERROR(message);
    } else if (thrown.constructor !== expectedErrorConstructor) {
      message += 'Expected a ' + expectedErrorConstructor.name +
        ' but got a ' + thrown.constructor.name;
      $ERROR(message);
    }
    return;
  }

  message += 'Expected a ' + expectedErrorConstructor.name +
    ' to be thrown but no exception was thrown at all';
  $ERROR(message);
};

var tests = [
  {
    name: 'return-abrupt-from-end.js',
    exec: function() {
      // Copyright (C) 2015 the V8 project authors. All rights reserved.
      // This code is governed by the BSD license found in the LICENSE file.
      /*---
esid: sec-array.prototype.fill
es6id: 22.1.3.6
description: >
  Return abrupt from ToInteger(end).
info: |
  22.1.3.6 Array.prototype.fill (value [ , start [ , end ] ] )

  ...
  8. If end is undefined, let relativeEnd be len; else let relativeEnd be
  ToInteger(end).
  9. ReturnIfAbrupt(relativeEnd).
  ...
---*/

      var end = {
        valueOf: function() {
          throw new Test262Error();
        }
      };

      assert.throws(Test262Error, function() {
        [].fill(1, 0, end);
      });

    }
  },
  {
    name: 'return-abrupt-from-setting-property-value.js',
    exec: function() {
      // Copyright (C) 2015 the V8 project authors. All rights reserved.
      // This code is governed by the BSD license found in the LICENSE file.
      /*---
esid: sec-array.prototype.fill
es6id: 22.1.3.6
description: >
  Return abrupt from setting a property value.
info: |
  22.1.3.6 Array.prototype.fill (value [ , start [ , end ] ] )

  ...
  11. Repeat, while k < final
    a. Let Pk be ToString(k).
    b. Let setStatus be Set(O, Pk, value, true).
    c. ReturnIfAbrupt(setStatus).
  ...
---*/

      var a1 = [];
      Object.freeze(a1);

      // won't break on an empty array.
      a1.fill(1);

      var a2 = {
        length: 1
      };
    }
  },
  {
    name: 'return-abrupt-from-start.js',
    exec: function() {
      // Copyright (C) 2015 the V8 project authors. All rights reserved.
      // This code is governed by the BSD license found in the LICENSE file.
      /*---
esid: sec-array.prototype.fill
es6id: 22.1.3.6
description: >
  Return abrupt from ToInteger(start).
info: |
  22.1.3.6 Array.prototype.fill (value [ , start [ , end ] ] )

  ...
  5. Let relativeStart be ToInteger(start).
  6. ReturnIfAbrupt(relativeStart).
  ...
---*/

      var start = {
        valueOf: function() {
          throw new Test262Error();
        }
      };

      assert.throws(Test262Error, function() {
        [].fill(1, start);
      });

    }
  },
  {
    name: 'return-abrupt-from-this-length.js',
    exec: function() {
      // Copyright (C) 2015 the V8 project authors. All rights reserved.
      // This code is governed by the BSD license found in the LICENSE file.
      /*---
esid: sec-array.prototype.fill
es6id: 22.1.3.6
description: >
  Return abrupt from ToLength(Get(O, "length")).
info: |
  22.1.3.6 Array.prototype.fill (value [ , start [ , end ] ] )

  1. Let O be ToObject(this value).
  2. ReturnIfAbrupt(O).
  3. Let len be ToLength(Get(O, "length")).
  4. ReturnIfAbrupt(len).
---*/

      var o1 = {};

      Object.defineProperty(o1, 'length', {
        get: function() {
          throw new Test262Error();
        },
        configurable: true
      });
      assert.throws(Test262Error, function() {
        [].fill.call(o1, 1);
      });

      var o2 = {
        length: {
          valueOf: function() {
            throw new Test262Error();
          }
        }
      };
      assert.throws(Test262Error, function() {
        [].fill.call(o2, 1);
      });

    }
  },
  {
    name: 'return-abrupt-from-this.js',
    exec: function() {
      // Copyright (C) 2015 the V8 project authors. All rights reserved.
      // This code is governed by the BSD license found in the LICENSE file.
      /*---
esid: sec-array.prototype.fill
es6id: 22.1.3.6
description: >
  Return abrupt from ToObject(this value).
info: |
  22.1.3.6 Array.prototype.fill (value [ , start [ , end ] ] )

  1. Let O be ToObject(this value).
  2. ReturnIfAbrupt(O).
---*/

      assert.throws(TypeError, function() {
        Array.prototype.fill.call(undefined, 1);
      });

      assert.throws(TypeError, function() {
        Array.prototype.fill.call(null, 1);
      });

    }
  },
  {
    name: 'return-this.js',
    exec: function() {
      // Copyright (C) 2015 the V8 project authors. All rights reserved.
      // This code is governed by the BSD license found in the LICENSE file.
      /*---
esid: sec-array.prototype.fill
es6id: 22.1.3.6
description: >
  Returns `this`.
info: |
  12. Return O.
---*/

      var arr = [];
      var result = arr.fill(1);

      assert.sameValue(result, arr);

      var o = {
        length: 0
      };
      result = Array.prototype.fill.call(o);
      assert.sameValue(result, o);

    }
  },
];

for (var i = 0; i < tests.length; ++i) {
  var exec = tests[i].exec;
  exec();
}