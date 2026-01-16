import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';
import {
  generateKeyPair,
  exportPublicKey,
  importPublicKey,
  encryptMessage,
  decryptMessage
} from './encryption';

const socket = io(process.env.REACT_APP_SERVER_URL || 'http://localhost:5000');

function App() {
  const [status, setStatus] = useState('disconnected'); // disconnected, waiting, connected, no-users
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [partnerTyping, setPartnerTyping] = useState(false);
  const [availableUsers, setAvailableUsers] = useState(0);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  
  // Encryption keys
  const keyPairRef = useRef(null);
  const partnerPublicKeyRef = useRef(null);

  useEffect(() => {
    // Initialize encryption keys
    generateKeyPair().then(keys => {
      keyPairRef.current = keys;
    });

    socket.on('online-status', (data) => {
      setAvailableUsers(data.availableUsers);
    });

    socket.on('waiting', () => {
      setStatus('waiting');
      setMessages([]);
    });

    socket.on('no-users-available', () => {
      setStatus('no-users');
      setMessages([]);
    });

    socket.on('stranger-found', async () => {
      setStatus('connected');
      setMessages([]);
      
      // Exchange public keys for encryption
      if (keyPairRef.current) {
        try {
          const myPublicKey = await exportPublicKey(keyPairRef.current.publicKey);
          socket.emit('public-key', myPublicKey);
        } catch (error) {
          console.error('Error exporting public key:', error);
        }
      }
    });

    socket.on('public-key', async (keyData) => {
      try {
        const partnerKey = await importPublicKey(keyData);
        partnerPublicKeyRef.current = partnerKey;
      } catch (error) {
        console.error('Error importing partner public key:', error);
      }
    });

    socket.on('stranger-disconnected', () => {
      setStatus('disconnected');
      setMessages([]);
      partnerPublicKeyRef.current = null;
      alert('Stranger disconnected. Click "Find Stranger" to find a new chat partner.');
    });

    socket.on('message', async (data) => {
      try {
        let decryptedText = '';
        if (data.encryptedText && keyPairRef.current) {
          // Decrypt the message
          decryptedText = await decryptMessage(data.encryptedText, keyPairRef.current.privateKey);
        } else {
          // Fallback for unencrypted messages (shouldn't happen)
          decryptedText = data.text || '[Encryption error]';
        }
        
        setMessages(prev => [...prev, { 
          text: decryptedText, 
          timestamp: data.timestamp,
          isOwn: false 
        }]);
      } catch (error) {
        console.error('Error decrypting message:', error);
        setMessages(prev => [...prev, { 
          text: '[Unable to decrypt message]', 
          timestamp: data.timestamp,
          isOwn: false 
        }]);
      }
    });

    socket.on('typing', () => {
      setPartnerTyping(true);
    });

    socket.on('stop-typing', () => {
      setPartnerTyping(false);
    });

    return () => {
      socket.off('online-status');
      socket.off('waiting');
      socket.off('no-users-available');
      socket.off('stranger-found');
      socket.off('public-key');
      socket.off('stranger-disconnected');
      socket.off('message');
      socket.off('typing');
      socket.off('stop-typing');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFindStranger = () => {
    socket.emit('find-stranger');
    setStatus('waiting');
  };

  const handleDisconnect = () => {
    socket.emit('disconnect-stranger');
    setStatus('disconnected');
    setMessages([]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (messageInput.trim() && status === 'connected') {
      const messageText = messageInput;
      setMessageInput('');
      handleStopTyping();
      
      // Show message immediately (optimistic update)
      setMessages(prev => [...prev, { 
        text: messageText, 
        timestamp: new Date().toISOString(),
        isOwn: true 
      }]);
      
      // Encrypt and send
      try {
        if (partnerPublicKeyRef.current) {
          const encryptedText = await encryptMessage(messageText, partnerPublicKeyRef.current);
          socket.emit('message', { encryptedText });
        } else {
          // If encryption not ready, wait a bit and retry
          setTimeout(async () => {
            if (partnerPublicKeyRef.current) {
              const encryptedText = await encryptMessage(messageText, partnerPublicKeyRef.current);
              socket.emit('message', { encryptedText });
            } else {
              console.error('Partner public key not available');
            }
          }, 500);
        }
      } catch (error) {
        console.error('Error encrypting message:', error);
        // Remove the optimistic message on error
        setMessages(prev => prev.slice(0, -1));
        alert('Failed to send message. Please try again.');
      }
    }
  };

  const handleTyping = () => {
    if (status === 'connected') {
      socket.emit('typing');
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        handleStopTyping();
      }, 1000);
    }
  };

  const handleStopTyping = () => {
    socket.emit('stop-typing');
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-header">
          <h1>💬 Stranger Chat</h1>
          <div className="status-indicator">
            <span className={`status-dot status-${status}`}></span>
            <span className="status-text">
              {status === 'disconnected' && 'Not Connected'}
              {status === 'waiting' && 'Finding Stranger...'}
              {status === 'connected' && (
                <>
                  Connected
                  <span className="encryption-badge">🔒 E2E Encrypted</span>
                </>
              )}
              {status === 'no-users' && 'No Users Online'}
            </span>
          </div>
        </div>

        {status === 'disconnected' && (
          <div className="welcome-screen">
            <div className="welcome-content">
              <h2>Welcome to Stranger Chat</h2>
              <p>Click the button below to start chatting with a random stranger!</p>
              <p style={{ fontSize: '14px', color: '#4ade80', marginTop: '10px' }}>
                🔒 All messages are end-to-end encrypted
              </p>
              {availableUsers > 0 && (
                <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                  {availableUsers} {availableUsers === 1 ? 'person' : 'people'} online
                </p>
              )}
              <button className="find-btn" onClick={handleFindStranger}>
                Find Stranger
              </button>
            </div>
          </div>
        )}

        {status === 'no-users' && (
          <div className="waiting-screen">
            <div className="no-users-message">
              <h3>⚠️ No Users Online</h3>
              <p>There are currently no other users available to chat with.</p>
              <p style={{ fontSize: '14px', marginTop: '10px' }}>
                Please try again in a few moments.
              </p>
            </div>
            <button className="cancel-btn" onClick={() => setStatus('disconnected')}>
              Go Back
            </button>
          </div>
        )}

        {status === 'waiting' && (
          <div className="waiting-screen">
            <div className="loading-spinner"></div>
            <p>Looking for someone to chat with...</p>
            <button className="cancel-btn" onClick={handleDisconnect}>
              Cancel
            </button>
          </div>
        )}

        {status === 'connected' && (
          <>
            <div className="messages-container">
              {messages.length === 0 && (
                <div className="empty-messages">
                  <p>You're connected! Start the conversation.</p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.isOwn ? 'message-own' : 'message-stranger'}`}
                >
                  <div className="message-content">{msg.text}</div>
                  <div className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              ))}
              {partnerTyping && (
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="message-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                className="message-input"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => {
                  setMessageInput(e.target.value);
                  handleTyping();
                }}
                disabled={status !== 'connected'}
              />
              <button
                type="submit"
                className="send-btn"
                disabled={!messageInput.trim() || status !== 'connected'}
              >
                Send
              </button>
              <button
                type="button"
                className="disconnect-btn"
                onClick={handleDisconnect}
                title="Disconnect"
              >
                ✕
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
