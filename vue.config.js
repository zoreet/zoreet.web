module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.whitespace = "preserve";
        return options;
      });
  },
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      title: "every day a new start",
    },
    login: {
      // entry for the page
      entry: "src/main.js",
      title: "Login",
    },
  },
};
