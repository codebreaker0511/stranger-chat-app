# GitHub Setup Instructions 🚀

Your code is ready to push! Follow these steps:

## Step 1: Create GitHub Repository

1. Go to **https://github.com/new**
2. Repository name: `stranger-chat-app`
3. Description: `Real-time chat app with end-to-end encryption`
4. Choose **Public** or **Private**
5. **IMPORTANT:** Do NOT check "Add a README file" (we already have one)
6. Click **"Create repository"**

## Step 2: Push Your Code

After creating the repo, GitHub will show you commands. Run these in your terminal:

```bash
cd C:\Users\prash\stranger-chat-app
git remote add origin https://github.com/YOUR_USERNAME/stranger-chat-app.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 3: Authentication

When you run `git push`, you'll be asked for credentials:

- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (not your GitHub password)

### How to create a Personal Access Token:

1. Go to **https://github.com/settings/tokens**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `stranger-chat-app`
4. Select scope: **`repo`** (full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

## Quick Copy-Paste Commands

Once you have your GitHub repo URL, run:

```bash
cd C:\Users\prash\stranger-chat-app
git remote add origin https://github.com/YOUR_USERNAME/stranger-chat-app.git
git branch -M main
git push -u origin main
```

## Verify It Worked

1. Go to your GitHub profile: `https://github.com/YOUR_USERNAME`
2. You should see `stranger-chat-app` in your repositories
3. Click on it to see all your code!

## Next Steps After Pushing

Once your code is on GitHub, you can:
- Deploy to Railway/Render (see `DEPLOYMENT.md`)
- Share the repo with friends
- Continue developing with version control

🎉 **Your code is ready to go live!**
