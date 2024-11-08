module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@app": "./src/app",
            "@entities": "./src/entities",
            "@features": "./src/features",
            "@widgets": "./src/widgets",
            "@shared": "./src/shared",
          },
        },
      ],
    ],
  };
};
