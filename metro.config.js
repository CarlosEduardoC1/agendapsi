// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const { resolver: { sourceExts } } = config;

config.resolver.assetExts.push('db');

config.transformer.babelTransformerPath = require.resolve("./transformer.js");
config.resolver.sourceExts = [...sourceExts, "scss", "sass"];


module.exports = config;
