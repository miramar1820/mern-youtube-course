const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== "production";


const plugins = [
    new HtmlWebpackPlugin({
        template: './src/index.html', // Данный html будет использован как шаблон
    }),
    new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[contenthash].css",
        chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
    }),
]; // Создаем массив плагинов

module.exports = {
    plugins,
    entry: "./src/index.js",
    devtool: 'source-map',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, "build"),
        // filename: "bundle.js",
        assetModuleFilename: 'assets/[hash][ext][query]', // Все ассеты будут
        // складываться в dist/assets
        clean: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "assets"),
        },
        port: 8081,
        hot: true,
        open: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
            },
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: devMode ? 'asset' : 'asset/resource', // В продакшен режиме
                // изображения размером до 8кб будут инлайнится в код
                // В режиме разработки все изображения будут помещаться в dist/assets
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.(scss)$/i,
                use: [
                    devMode ? MiniCssExtractPlugin.loader : 'style-loader',
                    // 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: ['babel-loader'],
            }
        ]

    }
}