# Simple logo generator for Webpack

## Usage

```
const LogoGeneratorWebpackPlugin = require("logo-generator-webpack-plugin");

module.exports = {
    plugins: [
        new LogoGeneratorWebpackPlugin({
            icon: { svgPath: "... some SVG path ..."}
        })
    ]
}
```
