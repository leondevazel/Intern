const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Business = require('./models/business');
const Review = require('./models/review');

const url =
"mongodb+srv://SunghoonLee:Leon.de.vaze1@cluster0.ghshkvz.mongodb.net/yelpclone1?retryWrites=true&w=majority"

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.render('home')
});

app.get('/business', async(req, res) => {
    const business = await Business.find({});
    console.log(business);
    res.render('businesses/index', { business });
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})

app.get('/business/:id', async(req, res) => {
    const business = await Business.findById(req.params.id);
    console.log(business);
    res.render('businesses/show', { business });
})

app.get('/business/new', (req, res) => {
    res.render('businesses/new');
  });

  app.post('/business', async (req, res) => {
    const business = new Business(req.body.business);
    await business.save();
    res.redirect(`/business/${business._id}`);
  });