// Controller actions for COMMENTS

const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = (app) => {
  // CREATE Comment
  app.post('/posts/:postId/comments', async (req, res) => {
    try {
      const sanitizedComment = req.sanitize(req.body.content)
      const comment = new Comment({ content: sanitizedComment });
      comment.author = req.user._id;
      await comment.save();
      const posts = await Promise.all([Post.findById(req.params.postId)])
      posts.forEach(async (post) => {
        post.comments.unshift(comment);
        await post.save();
      })
      res.redirect(`/posts/${req.params.postId}`)
    } catch (err) {
      console.log(err)
    }
  });
};
