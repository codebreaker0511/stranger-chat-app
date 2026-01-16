# Deploy Your App Now! 🚀

Follow these steps to get your app live in about 10 minutes.

## Option 1: Railway (Easiest - Recommended) ⭐

Railway can host both backend and frontend. Free tier available!

### Step 1: Deploy Backend

1. **Go to [railway.app](https://railway.app)** and sign up with GitHub
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. **Authorize Railway** to access your GitHub
5. **Select your repository** (`stranger-chat-app`)
6. Railway will start deploying automatically
7. **Click on the service** that was created
8. Go to **"Settings"** tab:
   - **Root Directory:** Set to `server`
   - **Start Command:** `node index.js`
9. Go to **"Variables"** tab and add:
   - `NODE_ENV` = `production`
   - `PORT` = `5000` (Railway will override this, but set it anyway)
10. Go to **"Settings"** → **"Generate Domain"** to get your backend URL
11. **Copy the URL** (e.g., `https://stranger-chat-backend.railway.app`)

### Step 2: Deploy Frontend

1. In the same Railway project, click **"+ New"** → **"Service"**
2. Select **"GitHub Repo"** → Your repository again
3. **Click on the new service**
4. Go to **"Settings"** tab:
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npx serve -s build -l 3000`
5. Go to **"Variables"** tab and add:
   - `REACT_APP_SERVER_URL` = Your backend URL from Step 1 (e.g., `https://stranger-chat-backend.railway.app`)
6. Go to **"Settings"** → **"Generate Domain"** to get your frontend URL
7. **Copy the frontend URL** - this is what you'll share!

### Step 3: Update CORS (Important!)

1. Go back to your **backend service**
2. Go to **"Variables"** tab
3. Add a new variable:
   - `ALLOWED_ORIGINS` = Your frontend URL (e.g., `https://stranger-chat-frontend.railway.app`)
4. The backend will automatically redeploy

### Step 4: Test!

1. Open your frontend URL in a browser
2. Open it in another browser/incognito window
3. Click "Find Stranger" on both
4. You should be matched! 🎉

---

## Option 2: Render (Free Forever) 🎨

### Step 1: Deploy Backend

1. **Go to [render.com](https://render.com)** and sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. **Connect your GitHub account** if not already
4. **Select your repository** (`stranger-chat-app`)
5. Fill in the settings:
   - **Name:** `stranger-chat-backend`
   - **Region:** Choose closest to you
   - **Branch:** `main` (or `master`)
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Instance Type:** Free
6. Click **"Advanced"** → **"Add Environment Variable"**:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
7. Click **"Create Web Service"**
8. Wait for deployment (takes 2-3 minutes)
9. **Copy your service URL** (e.g., `https://stranger-chat-backend.onrender.com`)

### Step 2: Deploy Frontend

1. Click **"New +"** → **"Static Site"**
2. **Select your repository** again
3. Fill in the settings:
   - **Name:** `stranger-chat-frontend`
   - **Branch:** `main` (or `master`)
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
4. Click **"Advanced"** → **"Add Environment Variable"**:
   - `REACT_APP_SERVER_URL` = Your backend URL from Step 1
5. Click **"Create Static Site"**
6. Wait for deployment
7. **Copy your site URL** - this is what you'll share!

### Step 3: Update CORS

1. Go back to your **backend service**
2. Go to **"Environment"** tab
3. Add environment variable:
   - `ALLOWED_ORIGINS` = Your frontend URL
4. The service will automatically redeploy

### Step 4: Test!

Same as Railway - open in two browsers and test!

---

## Option 3: Vercel (Frontend) + Render (Backend) ⚡

### Backend on Render:
- Follow **Option 2, Step 1** above

### Frontend on Vercel:

1. **Go to [vercel.com](https://vercel.com)** and sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. **Import your GitHub repository**
4. Configure:
   - **Framework Preset:** `Create React App`
   - **Root Directory:** `client`
   - **Build Command:** (leave default)
   - **Output Directory:** `build`
5. Click **"Environment Variables"**:
   - Add `REACT_APP_SERVER_URL` = Your Render backend URL
6. Click **"Deploy"**
7. **Copy your Vercel URL** - done!

---

## Quick Checklist ✅

After deployment, make sure:

- [ ] Backend is deployed and running
- [ ] Frontend is deployed and running
- [ ] `REACT_APP_SERVER_URL` points to your backend URL
- [ ] `ALLOWED_ORIGINS` includes your frontend URL
- [ ] Both services are accessible via their URLs
- [ ] Tested in two browsers - matching works!

## Troubleshooting

### "Connection failed" or CORS errors:
- Check that `ALLOWED_ORIGINS` includes your exact frontend URL
- Make sure there's no trailing slash in URLs
- Wait a minute after updating environment variables (services need to restart)

### "No users online" when testing:
- Make sure you're opening the app in TWO different browser sessions
- Try incognito/private browsing mode
- Clear browser cache

### Socket.io connection issues:
- Verify your backend URL is correct
- Check that the backend service is running (green status)
- Look at browser console (F12) for specific errors

## Share Your App! 🎉

Once everything works:
1. Share your **frontend URL** with friends
2. They can access it from anywhere!
3. No installation needed - just open the link

**Your app is now live!** 🚀
