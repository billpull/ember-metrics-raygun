import { get } from '@ember/object';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';
import canUseDOM from 'ember-metrics/utils/can-use-dom';


export default BaseAdapter.extend({
    toStringExtension() {
        return 'Raygun';
    },

    init() {
        const config = get(this, 'config');

        if (canUseDOM) {
            /* eslint-disable */
            (function(a,b,c,d,e,f,g,h){a.RaygunObject=e,a[e]=a[e]||function(){
            (a[e].o=a[e].o||[]).push(arguments)},f=b.createElement(c),g=b.getElementsByTagName(c)[0],
            f.async=1,f.src=d,g.parentNode.insertBefore(f,g),h=a.onerror,a.onerror=function(b,c,d,f,g){
            h&&h(b,c,d,f,g),g||(g=new Error(b)),a[e].q=a[e].q||[],a[e].q.push({
            e:g})}})(window,document,"script","//cdn.raygun.io/raygun4js/raygun.min.js","rg4js");
            /* eslint-disable */

            window.rg4js('apiKey', config.apiKey);
            window.rg4js('enableCrashReporting', config.enableCrashReporting || false);
            window.rg4js('enablePulse', config.enablePulse || false);
            window.rg4js('options', config.options);

            if (config.hasOwnProperty('tags')) {
                window.rg4js('withTags', config.tags);
            }

            if (config.hasOwnProperty('customData')) {
                window.rg4js('withCustomData', config.customData);
            }

            if (config.hasOwnProperty('filterScope')) {
                window.rg4js('setFilterScope', config.filterScope);
            }

            if (config.hasOwnProperty('filterSensitiveData')) {
                window.rg4js('filterSensitiveData', config.sensitiveData);
            }

            if (config.hasOwnProperty('version')) {
                window.rg4js('setVersion', config.version);
            }
        }
    },

    detach() {
        if (canUseDOM) {
            window.rg4js('detach');
        }
    },

    identify(options = {}) {
        if (canUseDOM) {
            window.rg4js('setUser', options);
        }
    },

    trackEvent(options = {}) {
        if (canUseDOM) {
            window.rg4js('trackEvent', options);
        }
    },

    trackPage({ page }) {
        this.trackEvent({
            type: 'pageView',
            path: `/${page}`,
        });
    },

    send({ error, tags = [], customData = {} }) {
        if (canUseDOM) {
            window.rg4js('send', {
                error,
                tags,
                customData,
            });
        }
    },

    willDestroy() {
        this.detach();
    }
});