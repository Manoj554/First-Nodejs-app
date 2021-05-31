const express = require("express");
const path = require("path");
const fs=require('fs');
const app = express();
const bodyparser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ekart', {useNewUrlParser: true});
const port = 8000;

//Defining mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    more: String,
  });

  const contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.status(200).render('home.pug');
        res.send("Your data is saved")
    }).catch(()=>{
        res.status(400).send("Item was not save to the database");
    });
});


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});