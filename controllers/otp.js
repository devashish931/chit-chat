const express = require('express');
const router = express.Router();
const User = require('../schemas/user.schema');


router.post('/', async (req, res) => {


    let response = await CheckStatus(req);
    res.send(response);

})

CheckStatus = async (req) => {

    var response = {};

    let session = req.session;
    let requestBody = req.body;
    console.log('session Otp', session.otp)
    console.log('request Otp', requestBody.otp)


    if (session.otp == requestBody.otp) {
        console.log(req.query.userId);
        let userId = req.query.userId;

        try {

            await User.updateOne({ '_id': userId }, { 'status': true }, {}, (error, doc) => {
                if (error) {
                    console.log('error', error);
                    response.type = false;
                    response.error = error;
                    response.message = 'error occured';
                } else {
                    console.log('doc updated', doc);
                    response.type = true;
                    response.message = 'Otp matched';
                }
            })

            return response;
        } catch (error) {
            console.log("error in updating status", error);
            response.type = false;
            response.message = "some error in updating status";
            return response;
        }
    } else {
        response.type = false;
        response.message = "Otp didn't match";
        return response;
    }
}



module.exports = router;