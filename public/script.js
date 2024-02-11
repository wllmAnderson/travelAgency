document.getElementById("redirectButton").addEventListener("click", function(e) {
  e.preventDefault();
  window.location.href = "thank-you.html";
});


const explore = document
  .getElementById("explore-button")
  .addEventListener("click", () => {
    const baliPackage = document.getElementById("bali-package");

    if (baliPackage) {
      baliPackage.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      console.error("Element with ID 'bali-package' not found.");
    }
  });

document.querySelectorAll(".book-now").forEach((element) => {
  element.addEventListener("click", () => {
    window.location.href = "booking.html";
  });
});

/*document.querySelector('.confirm').addEventListener('click', () => {
    window.location.href = 'confirmation-page.html';
})
*/
document.querySelector(".confirm").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Perform any additional actions or validation here

  // Redirect to the confirmation page
  window.location.href = "payment.html";
});

document.querySelector(".login").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Perform any additional actions or validation here

  // Redirect to the confirmation page
  alert('test');
  window.location.href = "/login.html";
});

// Fetch confirmation data from the server
fetch('/confirmation_data')
    .then(response => response.json())
    .then(data => {
        // Update the confirmation page with the received data
        document.getElementById('fullName').textContent = data.fullName;
        document.getElementById('email').textContent = data.email;
        document.getElementById('phone').textContent = data.phone;
        document.getElementById('destination').textContent = data.destination;
        document.getElementById('travelDate').textContent = data.travelDate;
        document.getElementById('accommodation').textContent = data.accommodation;
        document.getElementById('numTravelers').textContent = data.numTravelers;
    });

    // Handle payment submission
app.post('/submit_payment', (req, res) => {
  // Process the payment (e.g., validate credit card, charge the card)
  const paymentData = req.body;

  // Assuming payment processing logic here...

  // Once payment is successful, confirm the booking
  // You can integrate with a payment gateway API for actual payment processing
  // For demonstration purposes, let's just send a confirmation message
  res.send('Payment successful. Your booking is confirmed!');
});

    


/*
// Adding an event listener to the form for the 'submit' event
document.querySelector("form").addEventListener("submit", function (e) {
  // Getting the value from the name input field
  var name = document.getElementById("name").value;
  // Getting the value from the email input field
  var email = document.getElementById("email").value;
  // Getting the value from the message textarea
  var message = document.getElementById("message").value;
  // Getting the error message element to display any potential error messages
  var errorMessage = document.getElementById("error-message");
  // Check if any of the fields (name, email, or message) are empty
  if (!name || !email || !message) {
    // Set the error message content to inform user
    errorMessage.textContent =
      "All fields are required. Please fill in the form.";
    // Display the error message by setting the 'display' style to 'block'
    errorMessage.style.display = "block";
    // Prevent the form from submitting by using preventDefault() method
    e.preventDefault();
  } else {
    // If all fields are filled, hide the error message by setting the 'display' style to 'none'
    errorMessage.style.display = "none"; // Hide the error message
    window.location.href = "thank-you.html";
  }
});
*/