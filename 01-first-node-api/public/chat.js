// Create a new EventSource object that connects to the '/sse' endpoint
const eventSource = new EventSource('/sse');

// When a message is received from the server, update the 'messages' element with the new message
eventSource.onmessage = function(event) {
    document.getElementById('messages').innerHTML += `<p>${event.data}</p>`;
};

// Add a submit event listener to the 'form' element
document.getElementById('form').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the value of the 'input' element
    const message = document.getElementById('input').value;

    // Send a fetch request to the '/chat' endpoint with the message as a query parameter
    fetch(`/chat?message=${message}`);

    // Clear the value of the 'input' element
    document.getElementById('input').value = '';
});