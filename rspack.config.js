const { ModuleFederationPlugin } = require('@rspack/core').container;

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
  entry: './src/main.tsx',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'builtin:swc-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        profilePreview: 'profilePreview@https://assets.production.linktr.ee/profile-preview/latest/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    port: 3000,
    hot: true,
  },
};