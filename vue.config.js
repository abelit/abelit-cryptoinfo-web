const defaultSettings = {
  fixedHeader: false,
};

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  devServer: {
    port: 8080,
    open: true,
  },
};
