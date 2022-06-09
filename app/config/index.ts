/* global __DEV__ */

const config = {

  config: {
    debug: __DEV__,
  },
  api: {
    release: {
      tfl: 'https://api.tfl.gov.uk/',
    },
    debug: {
      tfl: 'https://api.tfl.gov.uk/',
    },
    tfl: (url: string) => (config.config.debug ? config.api.debug.tfl.concat(url) : config.api.release.tfl.concat(url)),
  },

};

export default config;
