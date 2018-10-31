import { get } from '@ember/object';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';

import rg4js from 'raygun4js';

export default BaseAdapter.extend({
    toStringExtension() {
        return 'Raygun';
    },

    init() {
        const config = get(this, 'config');

        rg4js('apiKey', config.apiKey);
        rg4js('enableCrashReporting', config.enableCrashReporting || false);
        rg4js('enablePulse', config.enablePulse || false);
        rg4js('options', config.options);

        if (config.hasOwnProperty('tags')) {
            rg4js('withTags', config.tags);
        }

        if (config.hasOwnProperty('customData')) {
            rg4js('withCustomData', config.customData);
        }

        if (config.hasOwnProperty('filterScope')) {
            rg4js('setFilterScope', config.filterScope);
        }

        if (config.hasOwnProperty('filterSensitiveData')) {
            rg4js('filterSensitiveData', config.sensitiveData);
        }
    },

    detach() {
        rg4js('detach');
    },

    identify(options = {}) {
        rg4js('setUser', options);
    },

    trackEvent(options = {}) {
        rg4js('trackEvent', options);
    },

    trackPage({ page }) {
        this.trackEvent({
            type: 'pageView',
            path: `/${page}`,
        });
    },

    send(error, tags = [], customData = {}) {
        rg4js('send', {
            error,
            tags,
            customData,
        });
    },

    willDestroy() {
        this.detach();
    }
});