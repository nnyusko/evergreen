const express = require('express');
const router = express.Router();
const {
  getClubs,
  createClub,
  getPostsByClub,
  createPost,
} = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');

router.route('/clubs').get(getClubs).post(protect, createClub);
router.route('/posts/:clubId').get(getPostsByClub).post(protect, createPost);

module.exports = router;
