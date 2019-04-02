module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      console.log("Vue Config...");
      args[0].meta = {
        viewport:
          "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      };
      return args;
    });
  }
};
