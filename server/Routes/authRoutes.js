const express = require('express');
const { signup, signin } = require('../Controllers/authController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

// Example of a protected route
router.get('/protected', auth, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

module.exports = router;
