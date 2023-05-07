const WebSocket = require('ws');

const clients = {};
const conversations = {};

const locationSocket = (server) => {
  const wss = new WebSocket.Server({ server, path: '/' });

  wss.on('connection', (socket, req) => {
    console.log('A new client connected!');

    // Parse the query parameters
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const clientId = queryParams.get('clientId');

    // Validate the clientId
    if (!clientId) {
      socket.send('clientId parameter is missing');
      socket.close();
      return;
    }

    if (clients[clientId]) {
      socket.send('clientId is already in use');
      socket.close();
      return;
    }

    // Store the client by its ID
    clients[clientId] = socket;

    // Send a welcome message to the new client
    socket.send(`Welcome to the server ${clientId}!`);

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
