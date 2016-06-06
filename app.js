var compression = require('compression'),
    express = require( 'express' ),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = express(),
    Poet = require('./lib/poet/poet');

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

/**
 * Instantiate and hook Poet into express; no defaults defined
 */
var poet = Poet(app);

/**
 * In this example, upon initialization, we can modify the posts,
 * like format the dates using a library, or modify titles.
 * We'll add some asterisks to the titles of all posts for fun.
 */
poet.init().then(function () {
  poet.clearCache();
});

poet.watch(function () {
  // watcher reloaded
}).init().then(function () {
  poet.clearCache();
});

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(compression())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

/**
 * Now we set up custom routes; based on the route (ex: '/post/:post'),
 * it'll override the default route for the same type and update
 * all appropriate helper methods
 */

poet.addRoute('/mypost/:post', function (req, res) {
  var post = poet.helpers.getPost(req.params.post);
  if (post) {
    res.render('post', { post: post });
  } else {
    res.send(404);
  }
});

poet.addRoute('/mytags/:tag', function (req, res) {
  var taggedPosts = poet.helpers.postsWithTag(req.params.tag);
  if (taggedPosts.length) {
    res.render('tag', {
      posts: taggedPosts,
      tag: req.params.tag
    });
  }
});

poet.addRoute('/mycategories/:category', function (req, res) {
  var categorizedPosts = poet.helpers.postsWithCategory(req.params.category);
  if (categorizedPosts.length) {
    res.render('category', {
      posts: categorizedPosts,
      category: req.params.category
    });
  }
});

poet.addRoute('/mypages/:page', function (req, res) {
  var page = req.params.page,
    lastPost = page * 3;
  res.render('page', {
    posts: poet.helpers.getPosts(lastPost - 3, lastPost),
    page: page
  });
});

app.get('/', function (req, res) { res.render('index'); });

app.get('/rss', function (req, res) {
  // Only get the latest posts
  var posts = poet.helpers.getPosts(0, 5);
  res.setHeader('Content-Type', 'application/rss+xml');
  res.render('rss', { posts: posts });
});

app.get('/sitemap.xml', function (req, res) {
  // Only get the latest posts
  var postCount = poet.helpers.getPostCount();
  var posts = poet.helpers.getPosts(0, postCount);
  res.setHeader('Content-Type', 'application/xml');
  res.render('sitemap', { posts: posts });
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

module.exports = app;
