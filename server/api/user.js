const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const upload = require('../middleware/upload')

router.post('/signup', upload.single('profilePicture'), userController.signup)
router.post('/verify', userController.verify)

module.exports = router;