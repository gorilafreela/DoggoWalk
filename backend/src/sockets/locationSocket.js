const WebSocket = require('ws');

const clients = {};
const conversations = {};

const locationSocket = (server) => {
  const wss = new WebSocket.Server({ server, path: '/' });

  wss.on('connection', (socket, req) => {
  
    // Parse the query parameters
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const conversationId = queryParams.get('conversationId');

    // Generate a unique client ID based on the timestamp
    const clientId = Date.now().toString();

    // Validate the conversation ID
    if (!conversationId) {
      socket.send('conversationId parameter is missing');
      socket.close();
      return;
    }

    // Store the client by its ID
    clients[clientId] = { socket, conversationId };

    // Add the client to the conversation
    if (!conversations[conversationId]) {
      conversations[conversationId] = [clientId];
    } else {
      conversations[conversationId].push(clientId);
    }

    // Send a welcome message to the new client
    socket.send(`Welcome to the conversation ${conversationId}, your client ID is ${clientId}`);

    // Listen for messages from the client
    socket.on('message', (message) => {
      console.log(`${clientId} said: ${message}`);

      // Broadcast the message to all clients in the same conversation
      conversations[conversationId].forEach((client) => {
        if (clients[client].socket !== socket) {
          clients[client].socket.send(`${clientId} said: ${message}`);
        }
      });
    });

    // Listen for socket close events
    socket.on('close', () => {
      console.log('A client disconnected');

      // Remove the client from the conversation
      const index = conversations[conversationId].indexOf(clientId);
      if (index > -1) {
        conversations[conversationId].splice(index, 1);
      }

      delete clients[clientId];
    });
  });
};

module.exports = { locationSocket };
