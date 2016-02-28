var express = require('express');
var router = express.Router();
var pg = require('pg');
//var connect = require('../modules/connection');


router.post('/data', function(req, res) {
    console.log(req);

    var addData = {
        pet_name: req.body.name.$t,
        pet_image_url: req.body.media.photos.photo[2].$t,
        pet_description: req.body.description.$t.substring(0, 99)
    };

    pg.connect(connect, function(err, client, done) {

        client.query('INSERT INTO petfinder (pet_name, pet_image_url, pet_description) VALUES ($1, $2, $3)',
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
        //var query = client.query('SELECT * FROM petfinder');

        // Stream results back one row at a time
        //query.on('row', function(row) {
        //    results.push(row);
        //});
        //
        //// close connection
        //query.on('end', function() {
        //    done();
        //    return res.json(results);
        //});
        //
        //if(err) {
        //    console.log(err);
        //}
    });
});


module.exports = router;