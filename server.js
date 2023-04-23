const express = require('express')
const mongodb = require('mongodb').MongoClient

//init app and middleware
const app = express()
port = 3001

const conectionStringURI = 'mongodb://localhost:27017/'

let db;

mongodb.connect(
    conectionStringURI,
    {
        useNewURLParser: true,
        useUnifiedTopology: true
    },
    (err, client) => {
        db = client.db()
        app.listen(port, () => {
            conmsole.log(`listening at http://localhost:${port}`)
        })
    }
)
app.listen(port)