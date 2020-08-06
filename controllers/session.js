const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {

    if (req.session.userId) {
        res.send({ type: true });
    } else {
        res.send({ type: false });
    }

})

module.exports = router;