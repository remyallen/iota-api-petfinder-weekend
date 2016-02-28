var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');
//var dataRoute = require('./routes/data');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var connectionString = '';

if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/petfinder';
}

//app.use('/data', dataRoute);
app.post('/data', function(req, res) {
    //console.log(req);

    var addData = {
        pet_name: req.body.name.$t,
        pet_image_url: req.body.media.photos.photo[2].$t,
        pet_description: req.body.description.$t.substring(0,99)
    };

    pg.connect(connectionString, function(err, client, done) {

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



// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});