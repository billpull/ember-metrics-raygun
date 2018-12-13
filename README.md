ember-metrics-raygun [![Build Status](https://travis-ci.org/billpull/ember-metrics-raygun.svg?branch=master)](https://travis-ci.org/billpull/ember-metrics-raygun)
==============================================================================

Metrics adapter for [Raygun](https://raygun.com/) error & user tracking.

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
          filterSensitiveData: []
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

### Installation

* `git clone https://github.com/billpull/ember-metrics-raygun`
* `cd ember-metrics-raygun`
* `yarn install`

### Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
