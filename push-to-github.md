# Push to GitHub - Step by Step

## Option 1: Using GitHub Website (Easiest)

1. **Go to GitHub.com** and sign in (or create an account)

2. **Click the "+" icon** in the top right → "New repository"

3. **Repository settings:**
   - Repository name: `stranger-chat-app` (or any name you like)
   - Description: "Real-time chat app with end-to-end encryption"
   - Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

4. **Copy the commands** GitHub shows you (they'll look like this):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/stranger-chat-app.git
   git branch -M main
   git push -u origin main
   ```

5. **Run these commands** in your terminal:
   ```bash
   cd C:\Users\prash\stranger-chat-app
   git remote add origin https://github.com/YOUR_USERNAME/stranger-chat-app.git
   git branch -M main
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your actual GitHub username)

6. **Enter your GitHub credentials** when prompted

## Option 2: Using GitHub CLI (If installed)

```bash
cd C:\Users\prash\stranger-chat-app
gh repo create stranger-chat-app --public --source=. --remote=origin --push
```

## Option 3: Manual Commands

If you already created the repo on GitHub:

```bash
cd C:\Users\prash\stranger-chat-app
git remote add origin https://github.com/YOUR_USERNAME/stranger-chat-app.git
git branch -M main
git push -u origin main
```

## Troubleshooting

**If you get authentication errors:**
- Use a Personal Access Token instead of password
- Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Give it "repo" permissions
- Use the token as your password when pushing

**If you get "remote already exists" error:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/stranger-chat-app.git
```

**To check your remote:**
```bash
git remote -v
```

Once pushed, your code will be on GitHub! 🎉
