const webpack = require("webpack")

const path = require("path")

/**@type {webpack.Configuration}*/
const webpack_config =
{
    entry: "./src/www/index.tsx",
    mode: process.env.WEBPACK_MODE,
    devtool: "inline-source-map",
    module:
    {
        rules:
        [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options:
                {
                    configFile: "tsconfig.client.json"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            }
        ]
    },
    resolve:
    {
        extensions: [".tsx",".ts",".js"]
    },
    output:
    {
        filename: "sauce.js",
        path: path.resolve(__dirname,"dist")
    },
    plugins:[
        new webpack.DefinePlugin({
            "process.env":
            {
                WEBPACK_MODE: JSON.stringify(process.env.WEBPACK_MODE)
            }
        })
    ]
}

module.exports = webpack_config