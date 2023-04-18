// Controller actions for COMMENTS

const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = (app) => {
  // CREATE Comment
  app.post('/posts/:postId/comments', async (req, res) => {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);
    // SAVE INSTANCE OF Comment MODEL TO DB
    try {
      await comment.save();
      const post = await Post.findById(req.params.postId);
      post.comments.unshift(comment);
      post.save();
      res.redirect(`/posts/${req.params.postId}`)
    } catch (err) {
      console.log(err)
    }
  });
};