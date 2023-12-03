const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
    name: String,
    email: String,
    password: String
}));

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: 'public' });
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (!user) {
        res.redirect('/error');
    } else {
        res.redirect('/dashboard');
    }
});

router.get('/signup', (req, res) => {
    res.sendFile('signup.html', { root: 'public' });
});
// added from 11:10pm
router.post('/find-doctor', async (req, res) => {
    const selectedSpecialty = req.body.specialty;
    const doctors = await Doctor.find({ specialty: selectedSpecialty });
    res.render('dashboard', { doctors });
});
// router.get('/dashboard', async (req, res) => {
//     try {
//         const doctors = await Doctor.find({});
//         res.render('dashboard', { doctors });
//     } catch (err) {
//         // Handle any errors here
//         res.render('error', { message: 'Error retrieving doctors' });
//     }
// });
// Add a new route for doctors.html
router.get('/doctors', (req, res) => {
    // Render the doctors.html page
    res.sendFile('doctors.html', { root: 'public' });
});

// Handle adding doctor information
router.post('/add-doctor', async (req, res) => {
    const { name, specialty, education } = req.body;

    // Create a new doctor document and save it to MongoDB
    const newDoctor = new Doctor({
        name,
        specialty,
        education,
    });

    await newDoctor.save();

    // Redirect back to the doctors.html page after adding a doctor
    res.redirect('/doctors');
});

// Route to display available doctors
router.get('/available-doctors', async (req, res) => {
    // Fetch all doctors from MongoDB based on specialty
    const specialty = req.query.specialty;
    const doctors = await Doctor.find({ specialty });

    // Render a template or send JSON response with the list of doctors
    res.render('available-doctors', { doctors });
});

// -------upto here
router.post('/signup', async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
        return res.send('A user with this email already exists. Please choose a different email address.');
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    await user.save();
    res.redirect('/login');
});

router.get('/error', (req, res) => {
    res.render('error');
});
// index.js (in routes folder)
// ... (previous code) ...

// Handle doctor addition
const Doctor = mongoose.model('Doctor', new Schema({
    name: String,
    specialty: String,
    education: String,
    age: Number,
    experience: Number,
    registration: String
}));

// ... (previous code) ...

// Handle doctor addition
router.post('/add-doctor', async (req, res) => {
  const newDoctor = new Doctor({
    name: req.body.docName,
    specialty: req.body.specialty,
    education: req.body.education,
    age: parseInt(req.body.age),
    experience: parseInt(req.body.experience),
    registration: req.body.registration
  });

  await newDoctor.save();
  res.redirect('/dashboard');
});
  
  // ... (remaining code) ...
  
module.exports = router;
