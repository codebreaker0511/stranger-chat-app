// End-to-end encryption using Web Crypto API

// Generate a key pair for encryption
export async function generateKeyPair() {
  return await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  );
}

// Export public key to send to partner
export async function exportPublicKey(key) {
  const exported = await window.crypto.subtle.exportKey('spki', key);
  return arrayBufferToBase64(exported);
}

// Import public key from partner
export async function importPublicKey(keyData) {
  const keyBuffer = base64ToArrayBuffer(keyData);
  return await window.crypto.subtle.importKey(
    'spki',
    keyBuffer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['encrypt']
  );
}

// Encrypt message using partner's public key
export async function encryptMessage(message, publicKey) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  
  try {
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      publicKey,
      data
    );
    
    return arrayBufferToBase64(encrypted);
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
}

// Decrypt message using own private key
export async function decryptMessage(encryptedData, privateKey) {
  try {
    const encryptedBuffer = base64ToArrayBuffer(encryptedData);
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      privateKey,
      encryptedBuffer
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
}

// Helper functions for base64 conversion
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
