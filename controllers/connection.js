const express = require('express');
const router = express.Router();
const Users = require('../schemas/user.schema');



router.get('/', async (req, res) => {

  let result = await getConnections(req);
  // console.log('connection list', result);
  res.send(result);
})

getConnections = async (request) => {

  let response = {}

  let session = request.session;

  if (session.userId) {

    let promise = new Promise((resolve, reject) => {
      Users.find({ connections: session.userId }, (error, result) => {
        if (error) {
          console.log('error', error);
          response.type = 'error';
          response.data = null;
          response.msg = 'error occured';
          reject(response);
        } else {
          // console.log('result', result);
          response.type = 'success';
          response.data = result;
          if (result.length) {
            response.msg = 'connections got';
          } else {
            response.msg = 'No connections found';
          }
          resolve(response);
        }
      })
    })

    return promise.then(response => response).catch(response => response)
  } else {
    response.type = 'error';
    response.data = null;
    response.session = session;
    response.msg = 'You are not authorized';
    return response;
  }



}


module.exports = router;