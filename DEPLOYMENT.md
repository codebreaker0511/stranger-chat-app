# Deployment Guide 🚀

This guide will help you deploy the Stranger Chat App so your friends can use it!

## Quick Test Locally First

1. **Install dependencies:**
   ```bash
   cd C:\Users\prash\stranger-chat-app
   npm run install-all
   ```

2. **Start the app:**
   ```bash
   npm run dev
   ```

3. **Test it:**
   - Open `http://localhost:3000` in one browser window
   - Open `http://localhost:3000` in another browser window (or incognito mode)
   - Click "Find Stranger" on both
   - You should be matched and can chat!

## Deployment Options

### Option 1: Railway (Recommended - Easiest) 🚂

Railway can host both frontend and backend easily.

**Backend Deployment:**
1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account
4. Select your repository
5. Railway will auto-detect Node.js
6. Set the root directory to `server`
7. Add environment variable: `PORT=5000` (Railway will provide its own port, but set this)
8. Deploy!

**Frontend Deployment:**
1. In Railway, add another service
2. Select your repo again
3. Set root directory to `client`
4. Add build command: `npm install && npm run build`
5. Add start command: `npx serve -s build -l 3000`
6. Add environment variable: `REACT_APP_SERVER_URL=https://your-backend-url.railway.app`
7. Deploy!

### Option 2: Render (Free Tier Available) 🎨

**Backend:**
1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - Name: `stranger-chat-backend`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Environment: `Node`
5. Add environment variable: `PORT=5000`
6. Deploy!

**Frontend:**
1. Click "New" → "Static Site"
2. Connect your GitHub repo
3. Settings:
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
4. Add environment variable: `REACT_APP_SERVER_URL=https://your-backend-url.onrender.com`
5. Deploy!

### Option 3: Vercel (Frontend) + Render (Backend) ⚡

**Backend on Render:**
- Follow Option 2 backend steps

**Frontend on Vercel:**
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repo
4. Settings:
   - Framework Preset: `Create React App`
   - Root Directory: `client`
   - Environment Variables:
     - `REACT_APP_SERVER_URL`: Your Render backend URL
5. Deploy!

### Option 4: Quick Test with ngrok (Temporary) 🔗

For quick testing with friends:

1. **Start your app locally:**
   ```bash
   npm run dev
   ```

2. **Install ngrok:**
   - Download from [ngrok.com](https://ngrok.com)
   - Or install via npm: `npm install -g ngrok`

3. **Expose your local server:**
   ```bash
   ngrok http 5000
   ```

4. **Update client to use ngrok URL:**
   - Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
   - Update `client/src/App.js` line 5:
     ```javascript
     const socket = io('https://abc123.ngrok.io');
     ```

5. **Share the ngrok URL** with friends (they access `http://localhost:3000` won't work - you'd need to expose that too)

**Note:** ngrok URLs change each time you restart, so this is only for quick testing!

## Important: Update Server URL

After deploying the backend, you need to update the frontend to point to your deployed server:

1. Update `client/src/App.js`:
   ```javascript
   const socket = io('https://your-backend-url.railway.app');
   // or
   const socket = io('https://your-backend-url.onrender.com');
   ```

2. Or use environment variable (recommended):
   - Create `client/.env`:
     ```
     REACT_APP_SERVER_URL=https://your-backend-url.railway.app
     ```
   - Update `client/src/App.js`:
     ```javascript
     const socket = io(process.env.REACT_APP_SERVER_URL || 'http://localhost:5000');
     ```

## Testing After Deployment

1. Open your deployed frontend URL
2. Open it in another browser/device
3. Click "Find Stranger" on both
4. You should be matched!

## Troubleshooting

- **CORS errors:** Make sure your server CORS settings allow your frontend domain
- **Socket.io connection fails:** Check that your server URL is correct and accessible
- **Messages not sending:** Check browser console for errors

Good luck! 🎉
