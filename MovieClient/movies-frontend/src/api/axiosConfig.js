import axios from 'axios';

// This code creates an HTTP client using the Axios library. 
// Axios allows us to specify and use common settings once, instead of typing the same settings over and over again for each request.
// For example, if we want all requests to use the same baseURL, we can specify this in an axios.create() object.

export default axios.create({
    baseURL : 'http://localhost:8080',
    headers : {"ngrok-skip-browser-warning" : true}
    // Ngrok is being added to bypass browser warnings when using the tunnel.
    // Ngrok is a tool that makes a server in a local development environment accessible over the internet.
    // For example: we can open an application running at localhost:3000 to the outside world as https://xyz.ngrok.io.
});