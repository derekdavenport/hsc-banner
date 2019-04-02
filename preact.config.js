import preactCliTypeScript from 'preact-cli-plugin-typescript'
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default (config, env, helpers) => {
	preactCliTypeScript(config);

  delete config.entry.polyfills;
  config.output.filename = "[name].js";

  let { plugin } = helpers.getPluginsByName(config, "ExtractTextPlugin")[0];
  plugin.options.disable = true;

  if (env.production) {
    config.output.libraryTarget = "umd";
	}

	const copy = new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: `*.*` }]);
	console.log(copy);
	config.plugins.push(copy);
};
