const express = require('express');


const router = express.Router();


router.get('/', async (req, response) => {

    let session = req.session;
    session.destroy();
    response.send({
        type: 'success',
    })

})


module.exports = router;