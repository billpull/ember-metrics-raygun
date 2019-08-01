ember-metrics-raygun [![Build Status](https://travis-ci.org/billpull/ember-metrics-raygun.svg?branch=master)](https://travis-ci.org/billpull/ember-metrics-raygun)
==============================================================================

Metrics adapter for [Raygun](https://raygun.com/) error & user tracking.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-metrics-raygun
```


Usage
------------------------------------------------------------------------------

```js
// config/environment.js
let ENV = {
  metricsAdapters: [
    {
      name: 'Raygun',
      config: {
          apiKey: '*********',
          enableCrashReporting: true,
          enablePulse: true,
          options: {},
          tags: [],
          customData: {},
          filterScope: 'all',
          filterSensitiveData: [],
          version: '1.0.0'
      }
    }
  ]
};
```

For documentation on above options view [Raygun's docs for raygun4js](https://raygun.com/docs/languages/javascript).

### Adapter Methods

- `detach`: detaches raygun instance from `window.onerror`

- `identify`: sets user data for affected user tracking. [Documentation for options](https://raygun.com/docs/languages/javascript#usertracking).

- `trackEvent`: send event data.

- `trackPage`: track page view event. [Documentation](https://raygun.com/docs/languages/javascript#pulseapi).

- `send`: manually send an error.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.



License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
