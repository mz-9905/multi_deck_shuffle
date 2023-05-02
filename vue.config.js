const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/multi_deck_shuffle',
  outputDir: 'docs',
  filenameHashing: false,
  productionSourceMap: false,
})
