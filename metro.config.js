const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Example for Zustand; adapt for Jotai
config.resolver.unstable_enablePackageExports = true;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "jotai" || moduleName.startsWith("jotai/")) {
    // Resolve to its CommonJS entry
    return {
      type: "sourceFile",
      filePath: require.resolve(moduleName),
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
