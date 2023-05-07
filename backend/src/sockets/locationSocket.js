const WebSocket = require('ws');

const locationSocket = (server) => {
  const wss = new WebSocket.Server({ server, path: '/' });

  wss.on('connection', (socket) => {
    console.log('A new client connected!');

    // Send a welcome message to the new client
    socket.send('Welcome to the server!');

    // Listen for messages from the client
    socket.on('message', (message) => {
      console.log(`Received message: ${message}`);
    });

    // Listen for socket close events
    socket.on('close', () => {
      console.log('A client disconnected');
    });
  });
};

module.exports = { locationSocket };
