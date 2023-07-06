const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const upload = require('../middleware/upload')
const protect = require('../middleware/authMiddleware')

router.post('/signup', upload.single('profilePicture'), userController.signup)
router.post('/verify', userController.verify)
router.post('/signin', userController.signIn)
router.get('/download/:id', userController.getExcel)
router.get('/pdf/:id', userController.getPdf)

module.exports = router;