const express = require('express');
const router = express.Router();
const authController = require('../controller/authcontroller.js');
const auth = require('../middleware/authenticate.js')



router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/samples', auth.loginAuthenticate, authController.samples);
router.post('/entersample', auth.adminAuthinticate, authController.entersample);
router.post('/heamatology', auth.adminAuthinticate, authController.heamatology);
router.post('/thyroid', auth.adminAuthinticate, authController.thyroid);
router.post('/glucometry', auth.adminAuthinticate, authController.glucometry);



module.exports = router