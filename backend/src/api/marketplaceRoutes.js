const express = require('express');
const router = express.Router();
const {
  getCategories,
  getServicesByCategory,
  createBooking,
} = require('../controllers/marketplaceController');
const { protect } = require('../middleware/authMiddleware'); // We will create this middleware next

router.route('/categories').get(getCategories);
router.route('/services/:categoryId').get(getServicesByCategory);
router.route('/bookings').post(protect, createBooking);

module.exports = router;
