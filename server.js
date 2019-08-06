const express = require('express');
const bodyParser = require('body-parser');

const {User} = require('./models/user');

const app = express();
app.use(bodyParser.json());
// Tell Express That It Should Always Use Json Format

/*
When Someone Sends Data To Route
By POST Method, Means That We Have
To Insert New Document In DataBase.
Inserts Will Be Done Using Mongoose
Models Which Are Defined In Models.
*/
app.post('/users', (req, res) => {

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        github: req.body.github,
        phone: req.body.phone,
        name: req.body.name,
        family: req.body.family,
    });

    user.save()
        .then((doc) => {
            res.send({doc});
        }, (err) => {
            res.status(400).send(err);
        });
});


// If We Get Requests By Get And No Parameter, We'll Return All Fields.
app.get('/users', (req, res) => {

    User.find()
        .then((users) => {
            res.send({users});
        });
});


// If We Get Requests By Get And A Parameter By 'username' Key
// For Example '---/localhost:3000/users/mamaddrg' => username = mamaddrg
app.get('/users/:username', (req, res) => {

    // username Is What Has Been Send By Get Method
    // We Neeed This Field To Search In Database.
    const username = req.params.username;
    User.find({
        username: username
    }).then((user) => {
        if (!user) {
            /* I DONT Know Why This If Statement
             Is NOT WORKING For Me :|
             It Always Return Something 
             Even If The User Is Empty */
            return res.status(404).send();
        }
        res.send({user});
    }, (err) => {
        res.status(404).send('User Not Found! ' + err);
    });
});


app.listen(3000, () => {
    console.log('Server Is Just Started On Port 3000 ...');
});