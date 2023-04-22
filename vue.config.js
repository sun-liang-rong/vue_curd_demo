const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
  //   host: 'localhost',
  //   port: 3001,
    proxy: {
      '/user': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
