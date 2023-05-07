const WebSocket = require('ws');
const clients = {};

const locationSocket = (server) => {
  const wss = new WebSocket.Server({ server, path: '/' });

  wss.on('connection', (socket) => {
    console.log('A new client connected!');

    // Send a welcome message to the new client
    socket.send('Welcome to the server!');

    // Generate a unique ID for the client
    const clientId = Date.now().toString();

    // Store the client by its ID
    clients[clientId] = socket;

    // Listen for messages from the client
    socket.on('message', (message) => {
      console.log(`${clientId} said: ${message}`);
      Object.values(clients).forEach((client) => {
        if (client !== socket) {
          client.send(`${clientId} said: ${message}`);
        }
      });
    });

    // Listen for socket close events
    socket.on('close', () => {
      console.log('A client disconnected');
      delete clients[clientId];
    });
  });
};

module.exports = { locationSocket };
