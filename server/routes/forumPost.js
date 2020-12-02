const verifyLogin = require('../middleware/verifyLogin');
const ForumPost = require('../modals/ForumPost');
const User = require('../modals/User');

module.exports = (app) => {
  
  app.post(
    '/api/forum/post',
    verifyLogin,
    async (req, res) => {
      try {

        const newPost = new ForumPost({
          title: req.body.title,
          content: req.body.content,
          tags: req.body.tags,
          name: req.user.name,
          user: req.user._id, 
          username: req.user.username,
          date: new Date(),
        });
  
        const post = await newPost.save();
  
        res.json(post);

      } catch (err) {
        res.status(500).send('Server Error');
        console.error(err.message);
      }
    }
  );

  app.get('/api/forum/post', async (req, res) => {
    try {
      const posts = await ForumPost.find().sort({ date: -1 });
      res.json(posts);
    } catch (err) {
      // console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  app.get('/api/forum/post/:type', verifyLogin, async (req, res) => {
    try {
      const postType = req.params.type;
      let posts;
      if(postType === 'all'){
        posts = await ForumPost.find().sort({ date: -1 });
      }else{
        posts = await ForumPost.findById({type: postType}).sort({ date: -1 });
      }
      console.log(posts)
      res.json(posts);
    } catch (err) {
      // console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  
  app.get('/api/forum/my-post/:id', async (req, res) => {
    try {
      const posts = await ForumPost.find({user: req.params.id});
  
      if (!posts) return res.status(400).json({ msg: 'Post not found' });

      res.json(posts);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server Error');
    }
  });
  
  app.delete('/api/forum/my-post/:id', verifyLogin, async (req, res) => {
    try {
      const post = await ForumPost.findById(req.params.id);
  
      // Check for post
      if (!post) return res.status(400).json({ msg: 'Post not found' });
  
      // Check user
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await post.remove();
  
      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);
  
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server Error');
    }
  });

  app.post(
    'api/forum/post/comment/:id',
    verifyLogin,
    async (req, res) => {
      try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await ForumPost.findById(req.params.id);
  
        const newComment = {
          text: req.body.text,
          name: user.name,
          user: req.user.id,
        };
  
        post.comments.unshift(newComment);
  
        await post.save();
  
        res.json(post.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
  app.delete('api/forum/post/comment/:id/:comment_id', verifyLogin, async (req, res) => {
    try {
      const post = await ForumPost.findById(req.params.id);
  
      // Pull out comment
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      // Check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      post.comments = post.comments.filter(
        ({ id }) => id !== req.params.comment_id
      );
  
      await post.save();
  
      return res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  });

  // app.put('/like/:id', verifyLogin, async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  
  //     // Check if the post has already been liked
  //     if (
  //       post.likes.filter((like) => like.user.toString() === req.user.id).length >
  //       0
  //     ) {
  //       return res.status(400).json({ msg: 'Post already liked' });
  //     }
  
  //     post.likes.unshift({ user: req.user.id });
  
  //     await post.save();
  
  //     res.json(post.likes);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('Server Error');
  //   }
  // });
  
  // app.put('/unlike/:id', verifyLogin, async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  
  //     // Check if the post has already been liked
  //     if (
  //       post.likes.filter((like) => like.user.toString() === req.user.id)
  //         .length === 0
  //     ) {
  //       return res.status(400).json({ msg: 'Post has not yet been liked' });
  //     }
  
  //     // Get remove index
  //     const removeIndex = post.likes
  //       .map((like) => like.user.toString())
  //       .indexOf(req.user.id);
  
  //     post.likes.splice(removeIndex, 1);
  
  //     await post.save();
  
  //     res.json(post.likes);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('Server Error');
  //   }
  // });
}
