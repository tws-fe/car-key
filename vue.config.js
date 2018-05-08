let projectConf = require('./project.config')
// const fs = require('fs')

module.exports = {
  configureWebpack: {
    output: {
      publicPath: process.env.VUE_APP_ENV === 'production'? projectConf.productionPath : '/'
    },
  }
  // lintOnSave: true,
  // dll: true,
  // devServer: {
  //   port: 8088,
  //   proxy: {
  //     '/': {
  //       target: 'http://192.168.5.67:8082',
  //       changeOrigin: true
  //     }
  //   }
  // },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: fs.readFileSync('src/modules/variables.scss', 'utf-8')
  //     }
  //   }
  // },
  
}
