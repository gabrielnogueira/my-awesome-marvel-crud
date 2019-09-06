const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');

module.exports = function override(config, env) {
	config = rewireAliases.aliasesOptions({
		'api': path.resolve(__dirname, `${paths.appSrc}/services/api`)
	})(config, env);
  return config;
}