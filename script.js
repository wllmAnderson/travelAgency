document.querySelector('form').addEventListener('submit', function(e) {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var errorMessage = document.getElementById('error-message');

    if (!name || !email || !message) {
        errorMessage.textContent = "All fields are required. Please fill in the form.";
        errorMessage.style.display = 'block'; // Show the error message
        e.preventDefault(); // Prevent form submission
    } else {
        errorMessage.style.display = 'none'; // Hide the error message
    }
});
