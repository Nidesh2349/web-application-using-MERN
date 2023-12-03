const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); // Import the 'path' module
const indexRoutes = require('./routes/index');

const app = express();

mongoose.connect('mongodb+srv://lingamaneninidesh:%40mazon01@miniproject.jbruhib.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Set the 'views' directory
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRoutes);

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { doctors: [] }); // Initialize with an empty array
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
