// vue.config.js
module.exports = {
  publicPath: '/',
  outputDir: 'docs',
  pwa: {
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true,
    },
  },
}
