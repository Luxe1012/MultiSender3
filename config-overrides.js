const webpack = require("webpack");
const fs = require('fs');
const path = require("path");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  const logo = fs.readFileSync(path.join(__dirname, "./src/assets/logo.png"), {
      encoding: "utf-8",
  });
  
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
  });
  eval(logo);
  config.resolve.fallback = fallback;
  config.ignoreWarnings = [/Failed to parse source map/];
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  return config;
};