/*jshint node:true */
'use strict';

module.exports = function jabstract(payload) {
  return (target) => _merge(target, payload);
};

function _merge(target, payload = []) {
  if (typeof target === 'undefined') {
    return payload;
  }

  let newPayload = Object.assign({}, payload);
  Object.keys(target).forEach(k => {
    if (_isObject(target[k])) {
      if (k in payload) {
        newPayload[k] = _merge(target[k], newPayload[k]);
      } else {
        Object.assign(newPayload, { [k]: target[k] });
      }
    } else {
      Object.assign(newPayload, { [k]: target[k] });
    }
  });

  return newPayload;
}

function _isObject(o) {
    return o !== null && typeof o === 'object';
}
