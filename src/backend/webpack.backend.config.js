var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const spawn = require('child_process').spawn;

class RunCommandAfterBuildPlugin {
    constructor(command) {
        this.alreadyLaunched = false;
        this.command = command;
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tap('RunCommandAfterBuildPlugin', () => {
            if (!this.alreadyLaunched) {
                this.alreadyLaunched = true;
                const [command, ...args] = this.command.split(' ');
                const proc = spawn(command, args, {stdio: 'inherit'});
                proc.on('close', this.puts);
            }
        });
    }

    puts(error) {
        if (error) {
            throw error;
        }
    }

    static execHandler(err, stdout, stderr) {
        if (stdout) process.stdout.write(stdout);
        if (stderr) process.stderr.write(stderr);
    }
}

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/backend/index.ts',
    target: 'node',
    output: {
        filename: 'index.tsx.js',
        path: path.resolve(__dirname, '../..', 'dist'),
    },
    devtool: 'source-map',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [
            new TsconfigPathsPlugin({configFile: './src/backend/tsconfig.json'}),
        ],

    },
    plugins: [
        new RunCommandAfterBuildPlugin('nodemon dist/index.js --watch dist'),
    ],
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.tsx?$/, loader: 'ts-loader'},
        ],
    },
    externals: nodeExternals(),
};
