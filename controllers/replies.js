const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {
  // New Reply
  app.get('/posts/:postId/comments/:commentId/replies/new', async (req, res) => {
    try {
      const currentUser = req.user;
      const post = await Post.findById(req.params.postId).lean();
      const comment = await Comment.findById(req.params.commentId).lean();
      res.render('replies-new', { post, comment, currentUser });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  });

  app.post('/posts/:postId/comments/:commentId/replies', async (req, res) => {
    try {
      const reply = new Comment(req.body);
      reply.author = req.user._id;
      const post = Post.findById(req.params.postId);
      await reply.save()
      const comment = await Comment.findById(req.params.commentId);
      console.log(comment)
      comment.comments.unshift(reply._id);
      await comment.save();
      res.redirect(`/posts/${req.params.postId}`); 
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  });
}