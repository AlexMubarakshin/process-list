const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const buildConfig = {
    devServer: {
        overlay: true,
        historyApiFallback: true,
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    node: {
        __dirname: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: "/node-modules"
            }
        ],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i
            }),
        ]
    }
};

console.log(__dirname)

module.exports = [

    Object.assign({}, buildConfig, {
        target: 'electron-main',
        entry: {
            main: './src/main/index.ts',
        },
        output: {
            filename: '[name]-bundle.js',
            path: path.resolve(__dirname, './app/main')
        },
    }),

    Object.assign({}, buildConfig, {
        target: 'electron-renderer',
        entry: {
            ui: './src/renderer/index.tsx',
        },
        output: {
            filename: '[name]-bundle.js',
            path: path.resolve(__dirname, './app/renderer')
        },
    })
]