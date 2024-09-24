const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const createConfig = () => {
  const config = getDefaultConfig(__dirname, { isCSSEnabled: true })
  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo")
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
  };

  return config;
}

const config = createConfig()
module.exports = withNativeWind(config, { input: './src/styles/global.css' })