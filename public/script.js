document.getElementById('greetBtn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const greeting = document.getElementById('greeting');

    if (name) {
        greeting.textContent = `Hello, ${name}! Welcome to the interactive web app.`;
    } else {
        greeting.textContent = 'Please enter your name!';
    }
});
