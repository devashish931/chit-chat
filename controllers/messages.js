const express = require('express');
const router = express.Router();
const Database = require('../database/db');


const database = Database;

const messageCollection = database.collection('messages');
const connectionCollection = database.collection('connections');

router.get('/', async (req, res) => {

    userId = req.query.userId;
    recieverId = req.query.recieverId;

    console.log('userId',userId);
    console.log('recieverId',recieverId);

    messages = [];

    let connectionId = await getConnectionId(userId,recieverId);
    console.log(connectionId)
    await messageCollection.where('connectionId', '==', connectionId).get().then(documents =>{
        documents.forEach(document => {
        messages.push(document.data());
        });
    }).catch(error=>console.log(error));

    console.log(messages);
    res.send(messages);


})

getConnectionId = async (userId,recieverId) =>{

    console.log('###########');
    let connectionId ;
    await connectionCollection.where('members', 'array-contains', userId).limit(1).get()
    .then(connections =>{
        connections.forEach(connection =>{
            console.log(connection.data())
           connectionId = connection.id;
        })
    }).catch(error=>console.log("error in retrieving Connection Id :>>",error));

    console.log(connectionId)
    return connectionId;

}
   


module.exports = router;