const WebSocket = require("ws");
const clients = {};
const conversations = {};
const solicitationRepository = require("../repositories/solicitationRepository");

const locationSocket = (server) => {
  const wss = new WebSocket.Server({ server, path: "/" });

  wss.on("connection", async (socket, req) => {
    // Parse the query parameters
    const queryParams = new URLSearchParams(req.url.split("?")[1]);
    const solicitationId = queryParams.get("solicitationId");

    // Generate a unique client ID based on the timestamp
    const clientId = Date.now().toString();

    // Validate the conversation ID
    if (!solicitationId) {
      socket.send("solicitationId parameter is missing");
      socket.close();
      return;
    }

    // Store the client by its ID
    clients[clientId] = { socket, solicitationId };

    let conversation = await findConversationById(solicitationId);
    if (!conversation) {
      socket.send("Invalid Id");
      socket.close();
      return;
    }
    // Add the client to the conversation
    if (!conversations[solicitationId]) {
      conversations[solicitationId] = [clientId];
    } else {
      conversations[solicitationId].push(clientId);
    }

    // Send a welcome message to the new client
    socket.send(
      `Welcome to the conversation ${solicitationId}, your client ID is ${clientId}`
    );

    // Listen for messages from the client
    socket.on("message", (message) => {
      console.log(`${clientId} said: ${message}`);

      // Broadcast the message to all clients in the same conversation
      conversations[solicitationId].forEach((client) => {
        if (clients[client].socket !== socket) {
          clients[client].socket.send(`${clientId} said: ${message}`);
        }
      });
    });

    // Listen for socket close events
    socket.on("close", () => {
      console.log("A client disconnected");

      // Remove the client from the conversation
      const index = conversations[solicitationId].indexOf(clientId);
      if (index > -1) {
        conversations[solicitationId].splice(index, 1);
      }

      delete clients[clientId];
    });
  });
};

const findConversationById = async (solicitationId) => {
  try {
    const conversation = await solicitationRepository.realTimeSolicitationById(solicitationId);
    return conversation;
  } catch {
    return null;
  }
};

module.exports = { locationSocket };
