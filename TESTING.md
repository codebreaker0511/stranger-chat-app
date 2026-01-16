# Testing Guide 🧪

## Quick Local Test

### Step 1: Install Dependencies
```bash
cd C:\Users\prash\stranger-chat-app
npm run install-all
```

### Step 2: Start the App
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend on `http://localhost:3000`

### Step 3: Test the App

**Option A: Two Browser Windows**
1. Open `http://localhost:3000` in Chrome
2. Open `http://localhost:3000` in Firefox (or Chrome Incognito)
3. Click "Find Stranger" on both
4. You should be matched!
5. Send messages and verify encryption is working

**Option B: Two Devices**
1. Find your computer's IP address:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., `192.168.1.100`)

2. On your phone/another device, open: `http://YOUR_IP:3000`
   (Make sure both devices are on the same WiFi)

3. Click "Find Stranger" on both devices
4. Test chatting!

### Step 4: Verify Features

✅ **No Login Required**
- Should work immediately, no signup

✅ **End-to-End Encryption**
- Check browser console (F12) - should see encryption/decryption
- Look for "🔒 E2E Encrypted" badge when connected

✅ **Random Matching**
- Two users should match when both click "Find Stranger"

✅ **No Users Online**
- If only one person is searching, should show "No Users Online" after a moment

✅ **Typing Indicators**
- Should see "..." when partner is typing

✅ **Disconnect**
- Click ✕ button to disconnect
- Partner should be notified

## Common Issues

**Port already in use:**
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Dependencies not installing:**
```bash
# Clear cache and reinstall
cd server
rm -rf node_modules package-lock.json
npm install

cd ../client
rm -rf node_modules package-lock.json
npm install
```

**Socket connection fails:**
- Check that server is running on port 5000
- Check browser console for CORS errors
- Make sure firewall isn't blocking ports

## Testing Encryption

1. Open browser DevTools (F12)
2. Go to Console tab
3. When you send a message, you should see encrypted data being sent
4. The server should only see encrypted strings, not plain text

## Next Steps

Once local testing works, follow `DEPLOYMENT.md` to make it live!
