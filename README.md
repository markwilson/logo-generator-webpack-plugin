# Simple logo generator for Webpack

## Usage

``` js
// npm install --save logo-generator-webpack-plugin
// or yarn add logo-generator-webpack-plugin

const LogoGeneratorWebpackPlugin = require("logo-generator-webpack-plugin");

module.exports = {
    plugins: [
        new LogoGeneratorWebpackPlugin({
            icon: { svgPath: "... some SVG path ..."}
        })
    ]
}
```
