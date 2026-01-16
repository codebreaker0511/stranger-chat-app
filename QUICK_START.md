# Quick Start Guide 🚀

## Test Locally (2 minutes)

1. **Open terminal in the project folder:**
   ```bash
   cd C:\Users\prash\stranger-chat-app
   ```

2. **Install everything:**
   ```bash
   npm run install-all
   ```

3. **Start the app:**
   ```bash
   npm run dev
   ```

4. **Test it:**
   - Open `http://localhost:3000` in your browser
   - Open `http://localhost:3000` in an incognito window (or different browser)
   - Click "Find Stranger" on both
   - You should match and can chat!

## Make it Live (10 minutes)

### Easiest Option: Railway

1. **Create GitHub repo:**
   - Go to GitHub.com
   - Create new repository
   - Push your code:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin YOUR_GITHUB_REPO_URL
     git push -u origin main
     ```

2. **Deploy Backend:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repo
   - Add service → Select repo again
   - Settings:
     - Root Directory: `server`
     - Start Command: `node index.js`
   - Copy the URL (e.g., `https://your-app.railway.app`)

3. **Deploy Frontend:**
   - In Railway, add another service
   - Select your repo
   - Settings:
     - Root Directory: `client`
     - Build Command: `npm install && npm run build`
     - Start Command: `npx serve -s build -l 3000`
   - Add environment variable:
     - Key: `REACT_APP_SERVER_URL`
     - Value: Your backend URL from step 2

4. **Update client code:**
   - Edit `client/src/App.js` line 5:
     ```javascript
     const socket = io(process.env.REACT_APP_SERVER_URL || 'http://localhost:5000');
     ```
   - Commit and push:
     ```bash
     git add .
     git commit -m "Update for production"
     git push
     ```

5. **Share the frontend URL** with your friends! 🎉

## Alternative: Render (Free)

1. **Backend:**
   - Go to [render.com](https://render.com)
   - New → Web Service
   - Connect GitHub repo
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `node index.js`

2. **Frontend:**
   - New → Static Site
   - Connect GitHub repo
   - Root Directory: `client`
   - Build: `npm install && npm run build`
   - Publish: `build`
   - Add env var: `REACT_APP_SERVER_URL` = your backend URL

Done! Share the frontend URL with friends.

## Need Help?

- See `TESTING.md` for detailed testing
- See `DEPLOYMENT.md` for more deployment options
