// socketService.js
import { io } from "socket.io-client";


let socket;

export const connectSocket = (userId,onNotification) => {
  
  const socketUrl = process.env.REACT_APP_SOCKET_SERVER_URL || "http://localhost:5000";

  
  socket = io(socketUrl); // Replace with your backend's port

  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
    console.log(userId, "Joining room");
    socket.emit("join", userId); // Join the user's room
  });

  socket.on("productUpdated", (data) => {
    console.log("Product updated:", data);
    // alert(`Product ${data.productId} updated: ${JSON.stringify(data.changes)}`);
    if (onNotification) {
      console.log(data,"================");
      
      onNotification(data); // Invoke the callback
    }
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("Disconnected from WebSocket server");
  }
};
