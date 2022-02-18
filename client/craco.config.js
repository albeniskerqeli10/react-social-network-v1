const CracoAlias = require("craco-alias");
// craco.config.js
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        // baseUrl SHOULD be <specified></specified>
        // plugin does not take it from tsconfig
        baseUrl: "./src",
        /* tsConfigPath should point to the file where "baseUrl" and "paths" 
        are specified*/
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
};
