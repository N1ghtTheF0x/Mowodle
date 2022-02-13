const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")

const path = require("path")

const WEBPACK_MODE = process.env["WEBPACK_MODE"]

const env = 
{
    WEBPACK_MODE
}

/**@type {HTMLWebpackPlugin.Options}*/
const html_options =
{
    templateContent: '<div id="app"></div>',
    favicon: path.resolve(__dirname,"src","www","assets","favicon.ico")
}

/**@type {webpack.Configuration}*/
const webpack_config =
{
    entry: "./src/www/index.tsx",
    mode: WEBPACK_MODE,
    module:
    {
        rules:
        [
            {
                test: /\.ts$/i,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ["style-loader","css-loader"],
                generator:
                {
                    filename: "css/[hash][ext]"
                }
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/i,
                type: "asset/resource",
                generator:
                {
                    filename: "img/[hash][ext]"
                }
            },
            {
                test: /\.glsl$/i,
                type: "asset/inline"
            }
        ]
    },
    resolve:
    {
        extensions: [".ts",".js"]
    },
    output:
    {
        filename: "sauce.js",
        path: path.resolve(__dirname,"dist","www"),
        assetModuleFilename: "assets/[hash][ext]"
    },
    plugins:[new HTMLWebpackPlugin(html_options),new webpack.DefinePlugin({
        "process.env": JSON.stringify(env)
    })],
    devtool: "inline-source-map"
}

module.exports = webpack_config