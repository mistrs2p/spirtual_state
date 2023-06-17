const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["quasar"],

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: true,
    },
  },
  chainWebpack: (config) => {
    // console.log(config.output.chunkFilename("[name].[contenthash].js"));
    config.output.filename("[name].[contenthash].js").end();
    config.output.chunkFilename("[name].[contenthash].js").end();
  },
});
