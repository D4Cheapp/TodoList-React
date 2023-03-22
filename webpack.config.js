const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

module.exports={
    //Режим проекта и точка входа
    mode: 'development',
    entry: {
        main: path.resolve(__dirname,'./src/index.js'),
    },
    optimization: {
        runtimeChunk: 'single',
    },
    stats: {
        children: true,
    },
    //Настройки сервера
    devServer: {
        watchFiles: [path.resolve(__dirname,"src")],
        historyApiFallback: true,
        port:3000,
        hot:true,
    },
    //Выходной main файл
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname,'docs')
    },
    resolve: {
        extensions: ['.ts', '.jsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader",'css-loader']
            },
            {
                //Компиляция из sass в css
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', {
                    loader: 'sass-loader',
                    options: {
                        additionalData: '@import src/sass/_variablesAndGlobal'
                    }
                }]
            },
            {
                //Обработка картинок, иконок, svg
                test: /\.(jpg|png|svg|ico|webp)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path]/[name].[ext]'
                    }
                }]
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname,'./public/index.html'),
        favicon: path.resolve(__dirname,'./public/favicon.ico')
    }),
        new CleanWebpackPlugin()
    ]
}