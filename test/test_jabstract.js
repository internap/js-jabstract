/*jshint node:true */
'use strict';

const assert = require('assert');
const jabstract = require('./../jabstract');

describe('jabstract', () => {
  it('should override the original payload with the given values', () => {
    let apiResponse = jabstract({
      'client': {
        'name': 'John doe',
        'email': 'johndoe@example.org'
      },
      'status': 'received'
    });

    let response = apiResponse({
      'client': {
        'name': 'Baboon v2.0'
      }
    });

    assert.deepEqual(response, {
      'client': {
        'name': 'Baboon v2.0',
        'email': 'johndoe@example.org'
      },
      'status': 'received'
    });
  });

  it('should start from a fresh copy at each invocation', () => {
    let apiResponse = jabstract({
      'client': {
        'name': 'John doe',
        'address': '123 street',
      }
    });

    let response1 = apiResponse({
      'client': {
        'name': 'Baboon v2.0'
      }
    });

    let response2 = apiResponse({
      'client': {
        'address': 'Some tree'
      }
    });

    assert.deepEqual(response1.client, {'name': 'Baboon v2.0', 'address': '123 street',});
    assert.deepEqual(response2.client, {'name': 'John doe', 'address': 'Some tree',});
  });

  it('should make sure the given payload cannot affect the original one', () => {
    let apiResponse = jabstract({
      'client': {
        'name': 'John doe',
        'face': {
          'eyes': {
            'color': 'green',
            'count': 2,
          }
        }
      }
    });

    let response1 = apiResponse();
    response1.client.face.eyes.color = 'red';

    let response2 = apiResponse();

    assert.deepEqual(response2, {
      'client': {
        'name': 'John doe',
        'face': {
          'eyes': {
            'color': 'green',
            'count': 2,
          }
        }
      }
    });
  });

  it(`should let you add a section because some apis are weird and field are optional`, () => {
    let apiResponse = jabstract({
      'client': {
        'name': 'John doe',
      }
    });

    let response = apiResponse({
      'client': {
        'car': {
          'color': 'blue'
        }
      }
    });

    assert.deepEqual(response, {
      'client': {
        'name': 'John doe',
        'car': {
          'color': 'blue'
        }
      }
    });
  });

  it(`should treat arrays as values rather than objects`, () => {
    let apiResponse = jabstract({
      'client': {
        'name': 'John doe',
        'hobbies': ['mocking', 'asserting']
      }
    });

    let response = apiResponse({
      'client': {
        'hobbies': ['stubbing']
      }
    });

    assert.deepEqual(response.client.hobbies, ['stubbing']);
  });

  it(`should allow null dicts in the fixtures`, () => {
    let apiResponse = jabstract({
      'client': {
        'stuff': null
      }
    });

    let response = apiResponse({
      'client': {
        'stuff': {
          'car': 'tesla model 3'
        }
      }
    });

    assert.deepEqual(response.client.stuff.car, 'tesla model 3');
  });
});
