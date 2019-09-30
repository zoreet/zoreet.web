// vue.config.js
module.exports = {
  publicPath: '/',
  outputDir: 'build',
  pwa: {
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true,
    },
  },
}
