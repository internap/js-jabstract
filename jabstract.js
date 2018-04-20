/*jshint node:true */
'use strict';

module.exports = function(payload) {
  return (target) => merge(target, payload);
};

function merge(target, payload) {
  if (typeof target === 'undefined') {
    target = {};
  }

  const newPayload = deepCopy(payload);

  Object.keys(target).forEach(k => {
    if (isDict(target[k]) && k in payload) {
      newPayload[k] = merge(target[k], newPayload[k]);
    } else {
      newPayload[k] = target[k];
    }
  });

  return newPayload;
}

function deepCopy(payload) {
  return JSON.parse(JSON.stringify(payload));
}

function isDict(o) {
    return o !== null && typeof o === 'object'  && !Array.isArray(o);
}
