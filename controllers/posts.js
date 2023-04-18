// Controller actions for POSTS
// import model
const Post = require('../models/post');


module.exports = (app) => {
  // root/index
  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      return res.render('posts-index', { posts });
    } catch (err) {
      console.log(err.message)
    }
  })
  // NEW
  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  });

  // CREATE
  app.post('/posts/new', async (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
    try {
      await post.save();
      res.redirect('/')
    } catch (err) {
      console.log(err);
    }
  });

  // SHOW
  // LOOK UP THE POST
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean();
      res.render('posts-show', { post });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const posts = await Post.find( { subreddit: req.params.subreddit }).lean();
      return res.render('posts-index', { posts });
    } catch (err) {
      console.log(err.message)
    }
  });
};