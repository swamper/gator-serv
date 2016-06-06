# gator-serv

## Synopsis

A node.js blog server with

[express.js](http://expressjs.com/)

[Bootstrap v4](https://v4-alpha.getbootstrap.com/)

[Font-Awesome](http://fontawesome.io/)

[Poet](https://jsantell.github.io/poet/)

that lets you build a blog from scratch without a lot of head scratching.

## Installation

Clone the repo:

    git clone https://github.com/swamper/gator-serv.git

and run:

    npm install

## Usage

This is a production server version of [gator-dev](https://github.com/swamper/gator-dev.git). This tool is the stripped down server for an app built with gator-dev after all the layout and styling is done. The complete toolchain for gator-dev is not necessary in production.

The idea is all that needs to be done after building the app in gator-dev is to run your posts out of this app.

This app is identical to gator-dev except the gulp toolchain and bower are not included. The default Poet examples are included.

Take "./views", "./_posts", and "./public" from gator-dev after you build your site and drop them in this app. Once you have copied over "./views" and "./public" and after you get your layout and styling done you should only ever have to work out of the "./posts" folder.

### Express

The app will serve up the blog on:

http://localhost:3000

The default Poet examples are already set up to serve from "./views".

To start the app run:

    npm start


Page error handling, compression, and some production level hardening for express are included in "app.js" and "./bin/www".

It is likely not production ready. Use your judgment. Some but by no means all of what needs to be done for an express production server is included.

See the [Express docs](http://expressjs.com/en/advanced/best-practice-performance.html) for more info.

### Poet

See the Poet [documentation](https://jsantell.github.io/poet/) for how to use Poet.

Poet is set up for custom routing in "app.js" based off the custom routing example provided with it. The Poet watcher, rss, and sitemap are set up in "app.js". A "404" page has been included in "./views".

## Motivation

Poet lets you put a really good blog builder on top of an express server, all it needed was wiring it up.

Bootstrap v4 has flexbox and mixins. What more could you want...

Bear in mind this is done for personal use so it is very opinionated.

## Tests

## Contributors

## License

MIT License :  https://opensource.org/licenses/MIT
