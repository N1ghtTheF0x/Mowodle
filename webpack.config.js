const webpack = require("webpack")

const path = require("path")

/**@type {webpack.Configuration}*/
const webpack_config =
{
    entry: "./src/www/index.tsx",
    module:
    {
        rules:
        [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
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
        path: path.resolve(__dirname,"dist","www")
    }
}