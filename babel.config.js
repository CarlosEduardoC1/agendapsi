module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["expo-router/babel"],
    plugins: [
      'react-native-reanimated/plugin',
      "react-native-classname-to-style",
      [
        "react-native-platform-specific-extensions",
        { extensions: ["scss", "sass"] },
      ],],
  };
};
