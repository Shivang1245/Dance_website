const express = require("express");
const path = require("path"); 
const multer = require('multer')

const app = express();

const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const { Server } = require("http");
mongoose.connect('mongodb://localhost/contactdance',{ useNewUrlParser: true, useUnifiedTopology: true });
const port = 8000;

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploadsfolder")
    },
    filename: (req, file, cb)=>{
        console.log(file)
        cb(null, Date.now()+ path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})
// mongoose schema for contact form
var db = mongoose.connection;

const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
    
});

const Contact = mongoose.model("Contact", ContactSchema);

// mongoose schema for into-form
const IntoformSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    pack: String,
    slotTimmings: String,
    visitDate: String,
    
});

const Intoform = mongoose.model("Intoform", IntoformSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{ 
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("The item was not saved to the database")
    });
})

app.get('/about', (req, res)=>{ 
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/class-info', (req, res)=>{ 
    const params = { }
    res.status(200).render('class-info.pug', params);
})
// for saving data in the database
app.get('/into-form', (req, res)=>{ 
    const params = { }
    res.status(200).render('into-form.pug', params);
})

app.post('/into-form', (req, res)=>{ 
    var mydata1 = new Intoform(req.body);
    mydata1.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("The item was not saved to the database")
    });

})
// for uploading videos only
app.get('/uploadform', (req, res)=>{ 
    const params = { }
    res.status(200).render('uploadform.pug', params);
})

app.post("/uploadform", upload.single("image"), (req, res)=>{
    res.send("Image uploaded")
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
