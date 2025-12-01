// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ensure node_modules are properly resolved
config.resolver.sourceExts = [...(config.resolver.sourceExts || []), 'tsx', 'ts', 'jsx', 'js', 'json'];

module.exports = config;

