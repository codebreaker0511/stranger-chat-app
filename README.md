# Stranger Chat App 💬

A real-time chat application that connects you with random strangers for anonymous conversations.

## Features

- 🔄 **Random Matching**: Connect with strangers instantly
- 🔒 **End-to-End Encryption**: All messages are encrypted using RSA-OAEP (Web Crypto API) - no login required
- 💬 **Real-time Chat**: Instant messaging with WebSocket technology
- ⌨️ **Typing Indicators**: See when your chat partner is typing
- 🎨 **Modern UI**: Beautiful, responsive design
- 🔌 **Easy Disconnect**: End conversations and find new partners anytime
- 👥 **Online Status**: See how many users are available and get notified when no one is online

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Real-time**: Socket.io
- **Styling**: CSS3 with modern gradients and animations

## Installation

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install all dependencies (root, server, and client):**
   ```bash
   npm run install-all
   ```

   Or manually:
   ```bash
   cd server && npm install && cd ../client && npm install
   ```

## Quick Start

**Want to test it?** See [QUICK_START.md](./QUICK_START.md) for a 2-minute local test!

**Want to deploy it?** See [QUICK_START.md](./QUICK_START.md) or [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment options!

## Running the Application

### Option 1: Run both server and client together
```bash
npm run dev
```

### Option 2: Run separately

**Terminal 1 - Start the server:**
```bash
npm run server
```
Server will run on `http://localhost:5000`

**Terminal 2 - Start the client:**
```bash
npm run client
```
Client will run on `http://localhost:3000`

## How to Use

1. Open the app in your browser (usually `http://localhost:3000`)
2. Click "Find Stranger" to start searching for a chat partner
3. Wait for a match (you'll see "Finding Stranger..." status)
4. Once connected, start chatting!
5. Click the ✕ button to disconnect and find a new stranger

## Project Structure

```
stranger-chat-app/
├── server/
│   ├── index.js          # Express server with Socket.io
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Styles
│   │   ├── encryption.js # E2E encryption utilities
│   │   └── index.js      # React entry point
│   └── package.json
├── package.json
└── README.md
```

## Notes

- **No Login Required**: The app is completely anonymous - no accounts, no registration
- **End-to-End Encryption**: All messages are encrypted on your device before sending. The server never sees your messages in plain text
- The app matches users randomly from a waiting queue
- Each user can only be connected to one stranger at a time
- If no users are online, you'll see a "No Users Online" message
- Disconnecting will notify your partner and end the conversation
- Messages are sent in real-time with timestamps
- Encryption keys are generated locally and exchanged securely between matched users

Enjoy chatting! 🎉
