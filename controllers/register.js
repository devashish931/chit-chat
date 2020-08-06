const express = require('express');
const mailOtp = require('../mailService/mailService');
const User = require('../schemas/user.schema');
const md5 = require('md5');

// let response = require('../services/response');

let user = null;

const router = express.Router();

function randomString(length) {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


const generateOTP = () => {

    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += Math.floor(Math.random() * 10);
    }
    Otp = OTP;
    return OTP;
}



const userExist = async (username) => {

    console.log(username);

    let userData = await User.findOne({
        username: username
    }, (err, result) => {
        if (err) {
            console.log('error in checking user existance :>>', err);
        } else {
            user = result;
            console.log('userResult :>>', result)
        }
    })

    return user ? true : false;

}



const addUser = async (request, isUserExist, userData) => {

    let { username, password, token } = request.body;

    let verifier = {};
    if (password) {
        verifier.password = md5(password);
        verifier.identifier = 'password'
    } else {
        verifier.password = token;
        verifier.identifier = 'token'
    }

    let response = {};

    if (isUserExist) {


        if (verifier.password == user[verifier.identifier]) {

            request.session.userId = user._id;
            response.type = 'success';
            response.userId = user._id;
            response.data = user;
            if (user.status) {

                response.msg = "Logged In successfully";
            } else {
                let otp = generateOTP();
                request.session.otp = otp;
                console.log("otp :>>", request.session.otp);
                // mailOtp(userData.username, otp);
                response.msg = ["OTP required"];
            }

        } else {
            response.type = 'error';
            response.msg = ["Incorrect password"];
        }
        return response;
    } else {
        console.log(2);

        let promise = new Promise((resolve, reject) => {
            userData.password = md5(userData.password);
            let token = randomString(10);
            userData.token = md5(token);
            User.create(userData, async (error, result) => {
                if (error) {
                    let errorsArray = Object.keys(error.errors);
                    let errors = [];

                    errorsArray.forEach(field => {
                        errors.push(error.errors[field].message);
                    });

                    response.type = 'error';
                    response.msg = errors;
                    response.data = null;
                    console.log('error in adding data to database :>>', errors);
                    reject(response);
                } else {
                    if (result) {
                        result.token = token;
                        let otp = generateOTP();
                        request.session.otp = otp;
                        request.session.userId = result._id;
                        console.log("otp :>>", request.session.otp);
                        // mailOtp(userData.username, otp);
                        response.type = 'success';
                        response.data = result;
                        response.userId = result._id;
                        response.msg = "Registered successfully";

                        resolve(response);
                    }
                }
            })
        })

        let result = promise.then(response => response).catch(response => response)
        console.log('add result', result);
        return result;
    }


}


router.post('/', async (req, response) => {
    let userData = {
        ...req.body,
        status: false,
        connections: [],
    }

    console.log('user add request', req.body);
    const isUserExist = await userExist(userData.username);
    console.log(1);
    let res = await addUser(req, isUserExist, userData);
    console.log(4);
    res.request = req.body;
    response.send(res)
})


module.exports = router;