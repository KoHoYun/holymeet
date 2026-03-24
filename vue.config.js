const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  transpileDependencies: true,

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    client: {
      webSocketURL: {
        protocol: 'ws',
        hostname: 'localhost',
        port: 3000,
        pathname: '/ws'
      }
    }
  }
})