import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import {
  teardownContext,
  teardownApplicationContext,
} from '@ember/test-helpers';

import sinon from 'sinon';

import MetricsService from 'ember-metrics/services/metrics';

const config = {
      apiKey: 'TEST_API_KEY',
      enableCrashReporting: true,
      enablePulse: true,
      options: {},
      tags: [],
      customData: {},
      filterScope: 'all',
      filterSensitiveData: []
  };

let sandbox;

module('Unit | Metrics Adapters | Raygun', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function() {
    sandbox = sinon.createSandbox();
    const Factory = this.owner.factoryFor('metrics-adapter:raygun');
    this.subject = Factory.create({ config });
  });

  hooks.afterEach(async function() {
    this.subject = undefined;
    sandbox.restore();
    await teardownApplicationContext(this);
    await teardownContext(this);
  });

  test('it tracks event', function(assert) {
    const stub = sandbox.stub(window, 'rg4js').callsFake(() => {
      return true;
    });

    const clickEvent = { type: 'click', name: 'register' };
    this.subject.trackEvent(clickEvent);

    assert.ok(stub.calledWith('trackEvent', clickEvent));
  });

  test('it tracks page view', function(assert) {
    const stub = sandbox.stub(window, 'rg4js').callsFake(() => {
      return true;
    });

    const page = '/index';
    const pageView = { type: 'pageView', path: page };
    this.subject.trackPage({ page });

    assert.ok(stub.calledWith('trackEvent', pageView));
  });

  test('it calls set user', function(assert) {
    const stub = sandbox.stub(window, 'rg4js').callsFake(() => {
      return true;
    });
    
    const user = { identifier: 1, distinctId: 1, uuid: 2 };
    this.subject.identify(user);

    assert.ok(stub.calledWith('setUser', { identifier: 1, uuid: 2 }));
  });

  test('it calls detach on destroy', function(assert) {
    const stub = sandbox.stub(window, 'rg4js').callsFake(() => {
      return true;
    });
    
    this.subject.willDestroy();

    assert.ok(stub.calledWith('detach'));
  });

  test('it can invoke `send` w/ defaults', function(assert) {
    this.owner.unregister('config:metrics');
    this.owner.unregister('service:metrics');
    this.owner.register('config:metrics', { 
      metricsAdapters: [
        {
          name: 'Raygun',
          config
        }
      ],
      environment: 'test'
    });
    this.owner.register('service:metrics', MetricsService);
    this.owner.inject('service:metrics', 'options', 'config:metrics');

    const metricsService = this.owner.lookup('service:metrics');
    const stub = sandbox.stub(window, 'rg4js').callsFake(() => {
      return true;
    });
    
    const error = 'Test Error';
    metricsService.invoke('send', 'Raygun', { error });

    assert.ok(stub.calledWith('send', { error, tags: [], customData: { } }));
  });

  // TODO: Initialization tests for various Raygun options
  // https://github.com/MindscapeHQ/raygun4js#initialization-options
});