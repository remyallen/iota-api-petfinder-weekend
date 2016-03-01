var express = require('express');
var router = express.Router();
var pg = require('pg');
var connect = require('../modules/connection');


router.post('/', function(req, res) {
    //console.log(req.body);

    var addData = {
        pet_name: req.body.name.$t,
        pet_image_url: req.body.media.photos.photo[2].$t,
        pet_description: req.body.description.$t.substring(0, 99)
    };

    pg.connect(connect, function(err, client, done) {

        client.query('INSERT INTO animal (pet_name, pet_image_url, pet_description) VALUES ($1, $2, $3)',
            [addData.pet_name, addData.pet_image_url, addData.pet_description],

        function (err, result){
            done();
            if(err) {
                console.log('error inserting data', err);
                res.send(false);
            } else {
                res.send(result);
            }
        });

    });
});

router.get('/', function(req, res) {
    var results = [];
    pg.connect(connect, function(err, client, done) {
        var query = client.query('SELECT * FROM animal;');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        // close connection
        query.on('end', function() {
            client.end();
            return res.json(results);
        });
        if(err) {
            console.log(err);
        }
    });
});

module.exports = router;