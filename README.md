[![Build Status](https://travis-ci.org/internap/js-jabstract.svg?branch=master)](https://travis-ci.org/internap/js-jabstract)

Javascript version of [jabstract](https://github.com/internap/jabstract)


# USAGE

Declare your json responses somewhere:

```
const jabstract = require('jabstract');

let apiResponse = jabstract({
    ... json-ish payload ...
});
```

Then use it in your tests by defining only relevant fields:

```
let response = apiResponse({
  'key': 'value'  
});
```

It even supports complex payloads!

```
let apiResponse = jabstract({
  'client': {
    'name': 'John doe',
    'email': 'johndoe@example.org'
  }
});

let response = apiResponse({
  'client': {
    'name': 'Baboon v2.0'
  }
});
```

\* note that `apiResponse` will keep its default value. So you can mock multiple fixtures for the same payload

# Importing

If you need to use jabstract for es5 (old nodejs or browser/karma) you can use the `dist/jabstract-browser-es5.js` file included in the nodejs package
