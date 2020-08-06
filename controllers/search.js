const express = require('express');
const router = express.Router();
const Database = require('../database/db');

const database = Database;

const userCollection = database.collection('users');

router.get('/', async (req, res) => {

    keyword = req.query.keyword;

    console.log('keyword',keyword);
    
    users = [];
    
    await userCollection.where('username','==', keyword).get()
    .then(documents =>{
        documents.forEach(document => {
            let userData = document.data();
            userData.id = document.id;
        users.push(userData);
        console.log('user retrieved', document.data().username);
        });
    }).catch(error=>console.log(error));

    res.send(users);


})
   


module.exports = router;