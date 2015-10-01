var config = {}

config.publicDirectory = "./<%= publicAssets %>";
config.sourceDirectory = "./<%= srcAssets %>";
config.publicAssets    = config.publicDirectory;
config.sourceAssets    = config.sourceDirectory;

module.exports = config;
