const express = require('express');

const bookingController = require('../controllers/bookingController');

const authController = require('../controllers/authController');

const router = express.Router();
router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession
);
module.exports = router;

router.use(authController.protect);
router
  .route('/')
  .get(bookingController.getBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBookings)
  .delete(bookingController.deleteBooking)
  .patch(bookingController.updateBooking);
