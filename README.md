# gator-dev

## Synopsis

A node.js blog builder with

[express.js](http://expressjs.com/)

[gulp.js](http://gulpjs.com/)

[Bootstrap v4](https://v4-alpha.getbootstrap.com/)

[Font-Awesome](http://fontawesome.io/)

[Poet](https://jsantell.github.io/poet/)

that lets you build a blog from scratch without a lot of head scratching.

## Installation

Clone the repo:

    git clone

and run:

    npm install

## Usage

This is a development toolchain. This tool is really in two parts. The gulp side deals with compiling static assets and putting them in the public directory for Poet to use. The express side has Poet running on it and it handles the blog and server.

There is no browsersync or livereload because Poet has a watcher in "app.js" this means the express server needs to be running for the page to reload on changing any files.

Rendering is done through express with jade templates.

### Gulp

Gulp will compile scss and js in the "./src" directory to the "./public" directory.

Gulp will lint, sourcemap, concat, and uglify all javascript assets in "./src/js".

Gulp will run node-sass, sourcemap, autoprefixer, and cleanCSS on ".scss" assets in "./src/scss".

By default this includes Bootstrap and Font-Awesome which are in "./src/scss/lib". Font-Awesome icons are in "./src/fonts/font-awesome" and are copied to "./public/fonts/font-awesome" with this directory set in "./src/scss/main.scss".

Default use is to call "./src/scss/main.scss" and "@import" any other scss files through it. This allows only having to call "/css/main.css" in layout.jade.

In "./src/css" is the unminified compiled "main.css" file for human readable troubleshooting.

Gulp processes images in "./src/img" with imagemin and puts them in "./public/img".

Gulp copies any assets in "./src" to "./public" including ".dotfiles".

Gulp tasks are in "./gulp".

Default gulp task is "build", run with:

    gulp

### Express

The app will serve up the blog on:

http://localhost:3000

The default Poet examples are already set up to serve from "./views".

To start the app run:

    npm start


Page error handling, compression, and some production level hardening for express are included in "app.js" and "./bin/www".

### Poet

See the Poet [documentation](https://jsantell.github.io/poet/) for how to use Poet.

Poet is set up for custom routing in "app.js" based off the custom routing example provided with it. The Poet watcher, rss, and sitemap are set up in "app.js". A "404" page has been included in "./views".

### Bower

Bower is set to put it's modules in "./src/bower_components". jQuery is the only current bower app included. It's assets are copied to "./public/js/vendor" with gulp.

### Bootstrap and Font-Awesome

Bootstrap and Font-Awesome are both added from git clones as I only want to include the source libraries. Their files are in "./src/scss/lib" and "./src/js/lib". Flexbox is turned on in Bootstrap inside "./src/scss/global/variables.scss". Styling is done in "./src/scss/global/style.scss".

## Motivation

Poet lets you put a really good blog builder on top of an express server, all it needed was wiring it up.

Bootstrap v4 has flexbox and mixins. What more could you want...

Bear in mind this is done for personal use so it is very opinionated.

The app is built so as if there is something that needs to be changed as in the css framework, such as using something besides Bootstrap, you just change it out with whatever framework and make the appropriate edits to the source files.

## Tests

## Contributors

## License

MIT License :  https://opensource.org/licenses/MIT
