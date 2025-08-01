const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    club: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Club',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
