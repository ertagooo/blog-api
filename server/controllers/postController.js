const Post = require("../models/Post");

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL POSTS
exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "username");
  res.json(posts);
};

// GET SINGLE POST
exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "username");
  res.json(post);
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.author.toString() !== req.user.id && !req.user.isAdmin) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE POST
exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.author.toString() !== req.user.id && !req.user.isAdmin) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await post.deleteOne();
  res.json({ message: "Post deleted" });
};