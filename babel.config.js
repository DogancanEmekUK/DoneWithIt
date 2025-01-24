module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["@babel/preset-env", "react-native"],
    plugins: [..."react-native-reanimated/plugin"],
  };
};
