/*jshint node:true */
'use strict';

const assert = require('assert');
const jabstract = require('./../jabstract');

describe('Will test jabstract', () => {
  it('Check if the fixture has been overridden with new parameters.', () => {
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

    assert.equal(JSON.stringify(response), JSON.stringify({
      'client': {
        'name': 'Baboon v2.0',
        'email': 'johndoe@example.org'
      },
      'status': 'received'
    }));
  });

  it('jabstract gives a fresh copy of 2 fixtures', () => {
    let apiResponse = new jabstract({
      'client': {
        'name': 'John doe',
      }
    });

    let response1 = apiResponse({
      'client': {
        'name': 'Baboon v2.0'
      }
    });

    let response2 = apiResponse({
      'client': {
        'name': 'Baboon v3.7'
      }
    });

    assert.equal(response1.client.name, 'Baboon v2.0');
    assert.equal(response2.client.name, 'Baboon v3.7');

  });

  it(`Let you add a section because some \
apis are weird and field are optional`, () => {
    let apiResponse = new jabstract({
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

    assert.equal(response.client.car.color, 'blue');
  });
});
