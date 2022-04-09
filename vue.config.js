  module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
          "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
        },
      },
    },
    css: {
      loaderOptions: {
        sass: {
          // Preload vuestic-ui variables and mixins for every component
        },
      },
    },
    lintOnSave: true,
    pwa: {
      workboxOptions: {
        importWorkboxFrom: "local",
        swSrc: "./src/service-worker.js",
      },
      workboxPluginMode: "InjectManifest",
    },
    devServer: {
      proxy: {
        "/dj-rest-auth/*": {
          // Forward frontend dev server request for /dj-rest-auth to django dev server
          target: "http://localhost:8000",
        },
        "/api/*": {
          // Forward frontend dev server request for /api to django dev server
          target: "http://localhost:8000",
        },
      },
    }
  };
