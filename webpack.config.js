// var babelConfig = require('./babel-config.json');

module.exports = {
    entry: {
        app: './src/LaunchApp.js',
    },
    output: {
        filename: '[name].bundle.js', // app.bundle.js
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude : /node_modules/,
                options: {
                    "presets": [
                        "es2015",
                        "react"
                    ]
                }
            }
        ]
    }
}