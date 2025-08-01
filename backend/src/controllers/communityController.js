const Club = require('../models/Club');
const Post = require('../models/Post');

// @desc    Get all clubs
// @route   GET /api/community/clubs
// @access  Public
const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find({}).populate('organizer', 'name');
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new club
// @route   POST /api/community/clubs
// @access  Private
const createClub = async (req, res) => {
  const { name, description } = req.body;
  try {
    const club = new Club({
      name,
      description,
      organizer: req.user._id,
      members: [req.user._id],
    });
    const createdClub = await club.save();
    res.status(201).json(createdClub);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get posts for a club
// @route   GET /api/community/posts/:clubId
// @access  Public
const getPostsByClub = async (req, res) => {
  try {
    const posts = await Post.find({ club: req.params.clubId }).populate('user', 'name');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new post in a club
// @route   POST /api/community/posts/:clubId
// @access  Private
const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({
      club: req.params.clubId,
      user: req.user._id,
      title,
      content,
    });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getClubs, createClub, getPostsByClub, createPost };
