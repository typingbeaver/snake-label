// webpack.mix.js
const mix = require('laravel-mix');
const fs = require('fs-extra')

mix.setPublicPath('dist');
mix.js(['src/crop.js', 'src/labels.js'], 'app.js')
   .extract()
   .after(() => {
      fs.copySync('node_modules/pdfjs-dist/build/pdf.worker.min.js',
         'dist/pdf.worker.min.js')
   });