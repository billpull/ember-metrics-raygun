import { get } from '@ember/object';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';

import rg4js from 'raygun4js';

export default BaseAdapter.extend({
    init() {
        const config = get(this, 'config');
        const { raygun } = config;

        rg4js('apiKey', raygun.apiKey);
        rg4js('enableCrashReporting', raygun.enableCrashReporting || false);
        rg4js('enablePulse', raygun.enablePulse || false);
        rg4js('options', raygun.options);

        if (raygun.hasOwnProperty('tags')) {
            rg4js('withTags', raygun.tags);
        }

        if (raygun.hasOwnProperty('customData')) {
            rg4js('withCustomData', raygun.customData);
        }

        if (raygun.hasOwnProperty('filterScope')) {
            rg4js('setFilterScope', raygun.filterScope);
        }

        if (raygun.hasOwnProperty('filterSensitiveData')) {
            rg4js('filterSensitiveData', raygun.sensitiveData);
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
});