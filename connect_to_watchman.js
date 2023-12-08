const net = require('net');

// Replace this with your named pipe path from 'watchman get-sockname'
const NAMED_PIPE = '\\\\.\\pipe\\watchman-moha9';

// Create a connection to the named pipe
const client = net.createConnection(NAMED_PIPE, () => {
    console.log('Connected to Watchman service via named pipe.');

    // Listening for data coming from the service
    client.on('data', (data) => {
        console.log('Data received from Watchman:', data.toString());
        // After receiving data, you can close the connection, or keep it open for continuous communication
        client.end();
    });
    
    // Handle connection closing
    client.on('end', () => {
        console.log('Disconnected from Watchman service.');
    });
    
    // Handle errors
    client.on('error', (err) => {
        console.error('Error connecting to Watchman service:', err.message);
    });

    // Send a command to Watchman. For example, getting the current version.
    // The command needs to be in BSER format. 
    // For simplicity, we're sending a raw JSON command here, but for more complex interactions, 
    // you might need to use a proper BSER encoding.
    client.write(JSON.stringify(['version']));
});

