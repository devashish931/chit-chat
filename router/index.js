const express = require('express');
const register = require('../controllers/register');
const otp = require('../controllers/otp');
const connections = require('../controllers/connection');
const logout = require('../controllers/logout');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('data recieved');
    res.send('<h1>From Server</h1>');
})

router.use('/register', register);
router.use('/otp', otp);
router.use('/connections', connections);
router.use('/logout', logout);




module.exports = router;