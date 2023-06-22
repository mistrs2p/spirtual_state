const plugins = [require("autoprefixer")];

if (process.env.VUE_APP_QUASAR_RTL) {
  plugins.push(require("postcss-rtl")({}));
}

module.exports = {
  plugins,
};
