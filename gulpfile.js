/*
Gulp 4 build flow
NPM Setup:
npm install gulp --global
npm install --save-dev gulp
npm install --save-dev gulp-uglify
npm install --save-dev gulp-uglifycss
npm install --save-dev pump
*/

/*
This is a very basic gulp flow.
Transpiles SCSS from /scss to CSS in /src_css
Minifies CSS from /src_css to /css
Minifies JS from /src_js to /js
Can watch SCSS for changes and transpile
*/


/* requires */
const { src, dest, series, parallel, watch } = require('gulp');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const pump = require('pump');



/* functions */

/*
Minify CSS from /src_css and place in /css
*/
const compresscss = () => {
  return src('./src_css/**/*.css')
    .pipe(uglifycss({
      "maxLineLen": 0,
      "uglyComments": true
    }))
    .pipe(dest('./css'));
};

/*
  Create or update distribution folder.
  'base' sets file folder level to project root.
*/
const distfiles = () => {
    return src([
      'index.html',  
      'CNAME',
      './css/*.css', 
      './images/*.jpg', 
      './page_images/*.svg', 
      './page_images/*.png', 
      './page_images/*.jpg' 
      ], 
      {base: './'})
    .pipe(dest('./dist'));
}

/*
Minify the CSS
Minify the JS
*/
exports.all = series(compresscss, distfiles);

