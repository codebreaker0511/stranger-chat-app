# Step-by-Step Deployment Guide 🚀

## 🎯 Quick Start: Railway (Recommended)

Railway is the easiest option. Follow these exact steps:

### Part 1: Deploy Backend (5 minutes)

1. **Visit [railway.app](https://railway.app)**
   - Click "Start a New Project"
   - Sign up with GitHub (it's free!)

2. **Connect Your Repo**
   - Click "Deploy from GitHub repo"
   - Authorize Railway
   - Select your `stranger-chat-app` repository
   - Click "Deploy Now"

3. **Configure Backend**
   - Click on the service that was created
   - Go to **Settings** tab
   - Set **Root Directory** to: `server`
   - Set **Start Command** to: `node index.js`
   - Click "Save"

4. **Get Your Backend URL**
   - Go to **Settings** tab
   - Scroll to **"Generate Domain"**
   - Click it to get a URL like: `https://stranger-chat-production.up.railway.app`
   - **COPY THIS URL** - you'll need it!

5. **Add Environment Variables**
   - Go to **Variables** tab
   - Click **"+ New Variable"**
   - Add: `NODE_ENV` = `production`
   - Click **"+ New Variable"** again
   - Add: `PORT` = `5000`

### Part 2: Deploy Frontend (5 minutes)

1. **Add Frontend Service**
   - In the same Railway project, click **"+ New"** (top right)
   - Select **"Service"**
   - Click **"GitHub Repo"**
   - Select your `stranger-chat-app` repository again

2. **Configure Frontend**
   - Click on the new frontend service
   - Go to **Settings** tab
   - Set **Root Directory** to: `client`
   - Set **Build Command** to: `npm install && npm run build`
   - Set **Start Command** to: `npx serve -s build -l 3000`
   - Click "Save"

3. **Add Environment Variable**
   - Go to **Variables** tab
   - Click **"+ New Variable"**
   - Name: `REACT_APP_SERVER_URL`
   - Value: Your backend URL from Part 1 (the one you copied!)
   - Click "Save"

4. **Get Your Frontend URL**
   - Go to **Settings** tab
   - Scroll to **"Generate Domain"**
   - Click it
   - **COPY THIS URL** - this is what you'll share with friends!

### Part 3: Fix CORS (Important!)

1. **Go back to your Backend service**
2. Go to **Variables** tab
3. Click **"+ New Variable"**
4. Name: `ALLOWED_ORIGINS`
5. Value: Your frontend URL from Part 2 (the one you just copied!)
6. Click "Save"
7. Wait 30 seconds for redeployment

### Part 4: Test It! 🎉

1. Open your **frontend URL** in a browser
2. Open the **same URL** in an incognito/private window (or different browser)
3. Click **"Find Stranger"** on both
4. You should be matched and can chat!

**That's it! Your app is live!** 🚀

---

## 🎨 Alternative: Render (Free Forever)

### Backend on Render:

1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo: `stranger-chat-app`
4. Configure:
   - **Name:** `stranger-chat-backend`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Instance Type:** Free
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
6. Click **"Create Web Service"**
7. Wait 2-3 minutes, then **copy your service URL**

### Frontend on Render:

1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repo again
3. Configure:
   - **Name:** `stranger-chat-frontend`
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
4. Add Environment Variable:
   - `REACT_APP_SERVER_URL` = Your backend URL
5. Click **"Create Static Site"**
6. **Copy your site URL**

### Update CORS:

1. Go back to backend service
2. **Environment** tab → Add variable:
   - `ALLOWED_ORIGINS` = Your frontend URL
3. Service will auto-redeploy

---

## ⚡ Alternative: Vercel (Frontend) + Render (Backend)

**Backend:** Follow Render steps above

**Frontend on Vercel:**

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repo
4. Configure:
   - **Framework Preset:** `Create React App`
   - **Root Directory:** `client`
5. Add Environment Variable:
   - `REACT_APP_SERVER_URL` = Your Render backend URL
6. Click **"Deploy"**
7. **Copy your Vercel URL**

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Backend service shows "Active" or "Live" status
- [ ] Frontend service shows "Active" or "Live" status  
- [ ] Backend URL is accessible (try opening it in browser - should show nothing or error, that's OK)
- [ ] Frontend URL opens your app
- [ ] Environment variables are set correctly
- [ ] Test matching works in two browsers

## 🐛 Common Issues & Fixes

### Issue: "Connection failed" or CORS error
**Fix:**
- Make sure `ALLOWED_ORIGINS` exactly matches your frontend URL
- No trailing slashes in URLs
- Wait 1-2 minutes after updating variables

### Issue: "No users online" when testing
**Fix:**
- Make sure you're using TWO different browser sessions
- Try incognito/private mode
- Clear browser cache

### Issue: Build fails
**Fix:**
- Check that Root Directory is set correctly (`server` or `client`)
- Verify build commands are correct
- Check deployment logs for specific errors

## 🎊 You're Done!

Once everything works:
- Share your **frontend URL** with friends
- They can access it from anywhere
- No installation needed!

**Your app is now live on the internet!** 🌐
