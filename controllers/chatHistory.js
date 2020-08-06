const express = require('express');
const router = express.Router();
const Database = require('../database/db');


const database = Database;

const userCollection = database.collection('users');

router.get('/', async (request, response) => {
    console.log('session 1', request.session)

    let connections = await getConnections(request);
    // console.log('connections of user ', connections);
    await getConnectionsDetails(connections,response);


})

const getConnections = async (request) => {

    console.log('user Id from chat history', request.query.userId);

    let userId = request.query.userId;

    return connections = await userCollection.doc(userId).get()
        .then(response => {

            return response.data().connections;
        })
        .catch(error => console.log('error in retrieving connections', error));

}

// const getConnectionsDetails = async (connections) => {

// let detailedConnections = [];

//     await connections.forEach(connection => {
//         userCollection.doc(connection).get().
//             then(response => { 
//                 let {name,username} = response.data();
//                 detailedConnections.push({id: response.id, name : name, username : username});
//             })
//             .catch(error => console.log('error in retrieving connection detail of id =>'+connection, error))
// });

// return detailedConnections;



// }


const getConnectionsDetails = async (connections,res) => {

    let detailedConnections = [];
    let promises = []
    for (let i = 0; i < connections.length; i++) {

        let promise = new Promise ((resolve,reject) =>{

            userCollection.doc(connections[i]).get().
            then(response => {
                let { name, username } = response.data();
                detailedConnections.push({ id: response.id, name: name, username: username });
                resolve();
            })
            .catch(error => console.log('error in retrieving connection detail of id =>' + connection, error))

        })

        promises.push(promise);

    }

    Promise.all(promises).then(response =>{
        console.log(detailedConnections);
        res.send(detailedConnections);
    }).catch(error =>{
        console.log('error in getting connection details :>> ',error)
        res.status(500);
    })

}




module.exports = router;