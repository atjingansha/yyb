const { defineConfig } = require('@vue/cli-service')


let proxyObj={};

proxyObj['/']={
  ws:false,
  target:'http://localhost:8081',
  changeOrigin: true,

  //不重写请求地址
  pathReWrite:{
    '^/':'/'
  }
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,

  devServer:{
    host:'localhost',
    port:'8080',
    proxy:proxyObj
  }
})
