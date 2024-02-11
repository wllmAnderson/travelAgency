const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const path = require('path'); 

let bookingData = null; // Initialize bookingData

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve images from the images folder
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Handle form submission
app.post('/submit_booking', (req, res) => {
  // Process the form data (you can save it to a database, etc.)
  bookingData = req.body;

  // Redirect to the confirmation page
  res.redirect('/payment.html');
});

app.get('/confirmation_data', (req, res) => {
  // Send the booking data to the confirmation page
  res.json(bookingData || {}); // Return an empty object if bookingData is null
});

// MongoDB connection
mongoose.connect('mongodb://localhost/login_page', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// User model
const User = mongoose.model('User', {
  username: String,
  password: String,
  profile: {
    firstName: String,
    lastName: String,
    email: String
  }
});

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/register', async (req, res) => {
  try {
    const { username, password, firstName, lastName, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      profile: {
        firstName,
        lastName,
        email
      }
    });
    await user.save();
    res.status(201).send('User registered successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while registering the user.');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid username or password.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid username or password.');
    }
    const token = jwt.sign({ username: user.username }, 'secretkey');
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while logging in.');
  }
});

app.get('/profile', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  try {
    const decoded = jwt.verify(token, 'secretkey');
    const username = decoded.username;
    User.findOne({ username }, (err, user) => {
      if (err) {
        return res.status(500).send('An error occurred while fetching the user profile.');
      }
      if (!user) {
        return res.status(404).send('User not found.');
      }
      res.status(200).json(user.profile);
    });
  } catch (error) {
    console.error(error);
    res.status(401).send('Invalid token.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
