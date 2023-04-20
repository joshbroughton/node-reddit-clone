// Controller actions for POSTS
// import model
const Post = require('../models/post');
const User = require('../models/user');


module.exports = (app) => {
  // root/index
  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean().populate('author');
      return res.render('posts-index', { posts });
    } catch (err) {
      console.log(err.message)
    }
  })
  // NEW
  app.get('/posts/new', (req, res) => {
    res.render('posts-new', {  })
  });

  // CREATE
  app.post('/posts/new', async (req, res) => {
    if (req.user) {
      try {
        const userId = req.user._id;
        const post = new Post(req.body);
        post.author = userId;
        await post.save();
        const user = await User.findById(userId);
        user.posts.unshift(post);
        user.save();
        res.redirect(`/posts/${post._id}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      return res.status(401);
    }
  });

  // SHOW
  // LOOK UP THE POST
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('comments').lean();
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