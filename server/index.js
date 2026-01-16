const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.io
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ["http://localhost:3000"];

const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

// Store waiting users and active conversations
const waitingUsers = [];
const conversations = new Map(); // socketId -> partnerSocketId
const onlineUsers = new Set(); // Track all online users

// Helper function to find a match
function findMatch(currentSocketId) {
  // Filter out users who are already in conversations
  const availableUsers = waitingUsers.filter(id => 
    id !== currentSocketId && !conversations.has(id)
  );
  
  if (availableUsers.length > 0) {
    const partnerId = availableUsers[0];
    const index = waitingUsers.indexOf(partnerId);
    if (index > -1) {
      waitingUsers.splice(index, 1);
    }
    return partnerId;
  }
  return null;
}

// Get count of users available for matching (not in conversations)
function getAvailableUsersCount() {
  return waitingUsers.length;
}

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  onlineUsers.add(socket.id);

  // Send initial online status
  socket.emit('online-status', {
    availableUsers: getAvailableUsersCount(),
    totalOnline: onlineUsers.size
  });

  // User wants to find a stranger to chat with
  socket.on('find-stranger', () => {
    // Remove from any existing conversation
    if (conversations.has(socket.id)) {
      const partnerId = conversations.get(socket.id);
      conversations.delete(partnerId);
      conversations.delete(socket.id);
      socket.to(partnerId).emit('stranger-disconnected');
    }

    const partnerId = findMatch(socket.id);
    
    if (partnerId) {
      // Found a match!
      conversations.set(socket.id, partnerId);
      conversations.set(partnerId, socket.id);
      
      socket.emit('stranger-found');
      socket.to(partnerId).emit('stranger-found');
      
      console.log(`Matched ${socket.id} with ${partnerId}`);
    } else {
      // Check if there are any available users
      const availableCount = getAvailableUsersCount();
      if (availableCount === 0) {
        // No users available
        socket.emit('no-users-available');
        console.log(`${socket.id} - No users available`);
      } else {
        // No match found, add to waiting list
        waitingUsers.push(socket.id);
        socket.emit('waiting');
        console.log(`${socket.id} added to waiting list`);
      }
    }
  });

  // User wants to disconnect from current stranger
  socket.on('disconnect-stranger', () => {
    const partnerId = conversations.get(socket.id);
    if (partnerId) {
      conversations.delete(partnerId);
      conversations.delete(socket.id);
      socket.to(partnerId).emit('stranger-disconnected');
      socket.emit('stranger-disconnected');
    }
  });

  // Handle incoming messages (encrypted messages are passed through)
  socket.on('message', (data) => {
    const partnerId = conversations.get(socket.id);
    if (partnerId) {
      // Pass encrypted message through - server doesn't decrypt
      io.to(partnerId).emit('message', {
        encryptedText: data.encryptedText,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Handle public key exchange for encryption
  socket.on('public-key', (keyData) => {
    const partnerId = conversations.get(socket.id);
    if (partnerId) {
      // Forward public key to partner
      socket.to(partnerId).emit('public-key', keyData);
    }
  });

  // Handle typing indicators
  socket.on('typing', () => {
    const partnerId = conversations.get(socket.id);
    if (partnerId) {
      socket.to(partnerId).emit('typing');
    }
  });

  socket.on('stop-typing', () => {
    const partnerId = conversations.get(socket.id);
    if (partnerId) {
      socket.to(partnerId).emit('stop-typing');
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    onlineUsers.delete(socket.id);
    
    // Remove from waiting list if present
    const waitingIndex = waitingUsers.indexOf(socket.id);
    if (waitingIndex > -1) {
      waitingUsers.splice(waitingIndex, 1);
    }

    // Handle conversation cleanup
    const partnerId = conversations.get(socket.id);
    if (partnerId) {
      conversations.delete(partnerId);
      conversations.delete(socket.id);
      socket.to(partnerId).emit('stranger-disconnected');
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
