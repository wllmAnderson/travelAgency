const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

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
  res.redirect('/confirmation-page.html');
});

app.get('/confirmation_data', (req, res) => {
  // Send the booking data to the confirmation page
  res.json(bookingData || {}); // Return an empty object if bookingData is null
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
