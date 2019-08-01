const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    outputDir: '../../../dist/vuejs',
    configureWebpack: {
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            plugins: [
                new TsconfigPathsPlugin({configFile: './tsconfig.json'}),
            ],

        },
    },
};
