var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";

function database() {
    MongoClient.connect(url, function (err, client) {
        if (err) throw err
        var db = client.db('Events')

        db.collection('People').find().toArray(function (err, result) {
            if (err) throw err

            console.log(result)
        })
    })
}

function insertDatabase(myobj) {
    MongoClient.connect(url, function (err, client) {
        if (err) throw err
        var db = client.db('Events')
        db.collection('People').insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        });
    })
}

module.exports = {
    show: database,
    insertDatabase: insertDatabase
}