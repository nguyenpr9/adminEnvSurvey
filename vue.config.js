module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Vue jS";
      return args;
    });
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://45.77.250.236:5000",
        ws: true,
        changeOrigin: true
      }
    }
  },
  runtimeCompiler: true
};
