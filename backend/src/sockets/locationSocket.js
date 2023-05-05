const socketIO = require("socket.io");

const location = (server) => {
  const io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("A user connected to location socket");
    // Listen to the 'location' event
    socket.on("location", (data) => {
      console.log(`Received location data: ${data}`);
      // Do something with the location data
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected from location socket");
    });
  });
};

module.exports = { location };
