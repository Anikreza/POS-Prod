const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/js/app.tsx', 'public/js')
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"]
        }
    })
    .js("./node_modules/flowbite/dist/flowbite.js", "public/js")
    .react()
    .postCss("resources/css/app.css", "public/css", [
        require('postcss-import'),
        require("tailwindcss"),
    ])
    .postCss("./node_modules/flowbite/dist/flowbite.css", "public/css")
    .sass('resources/sass/app.scss', 'public/css');
