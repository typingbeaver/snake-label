// webpack.mix.js
let mix = require('laravel-mix');

mix.setPublicPath('dist')
mix.js('src/crop.js', 'app.js')
//    .extract('pdfjs-dist/build/pdf.worker.js')
   .extract()