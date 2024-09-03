const config = require("@zthun/lint-janitor-config/eslint");
config.rules["@typescript-eslint/no-unsafe-declaration-merging"] = "off";
config.rules["@typescript-eslint/no-empty-object-type"] = "off";
config.env = { node: true, browser: true };
module.exports = config;
