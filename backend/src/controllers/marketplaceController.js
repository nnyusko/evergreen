const Category = require('../models/Category');
const Service = require('../models/Service');
const Booking = require('../models/Booking');

// @desc    Get all categories
// @route   GET /api/marketplace/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get services by category
// @route   GET /api/marketplace/services/:categoryId
// @access  Public
const getServicesByCategory = async (req, res) => {
  try {
    const services = await Service.find({ category: req.params.categoryId });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new booking
// @route   POST /api/marketplace/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { serviceId, bookingDate } = req.body;

  try {
    const booking = new Booking({
      user: req.user._id, // Assumes user is authenticated and req.user is populated
      service: serviceId,
      bookingDate,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getCategories, getServicesByCategory, createBooking };
