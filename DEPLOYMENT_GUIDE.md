# 🚀 Deployment Guide for Render

This guide will walk you through deploying your Movie Recommendation App on Render.

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ GitHub account with your repository pushed
- ✅ Render account (sign up at https://render.com)
- ✅ MongoDB Atlas account with a database created
- ✅ TMDB API key (get it from https://www.themoviedb.org/settings/api)

---

## 🎯 Deployment Steps

### Step 1: Prepare Your MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (if you haven't already)
3. Click "Connect" → "Connect your application"
4. Copy your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
5. Replace `<password>` with your actual password
6. Keep this connection string handy - you'll need it soon!

---

### Step 2: Push Your Code to GitHub

Make sure all your latest changes are committed and pushed:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

---

### Step 3: Deploy Backend API on Render

#### Option A: Using Blueprint (Recommended - Automated)

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" → "Blueprint"

2. **Connect Your Repository**
   - Select your GitHub repository: `movie-recommendation-app`
   - Render will detect the `render.yaml` file automatically

3. **Configure Environment Variables**
   - Render will prompt you to set the following:
     - `MONGODB_URI`: Paste your MongoDB connection string
     - `TMDB_API_KEY`: Paste your TMDB API key
   - Click "Apply"

4. **Deploy**
   - Render will automatically deploy both backend and frontend
   - Wait for both services to finish building (5-10 minutes)

#### Option B: Manual Setup (Alternative)

If you prefer manual setup:

1. **Create Backend Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `movie-recommendation-api`
     - **Region**: Choose closest to you
     - **Branch**: `main`
     - **Root Directory**: Leave empty
     - **Runtime**: `Node`
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && npm start`
     - **Plan**: Free

2. **Add Environment Variables** (in the Environment tab):
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_secure_random_string_here
   TMDB_API_KEY=your_tmdb_api_key_here
   TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

3. **Deploy Backend**
   - Click "Create Web Service"
   - Wait for deployment to complete

---

### Step 4: Deploy Frontend on Render

1. **Create Static Site**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `movie-recommendation-frontend`
     - **Branch**: `main`
     - **Root Directory**: Leave empty
     - **Build Command**: `cd frontend && npm install && npm run build`
     - **Publish Directory**: `frontend/build`

2. **Add Environment Variables**:
   ```
   REACT_APP_API_URL=https://movie-recommendation-api.onrender.com/api
   REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
   ```
   
   ⚠️ **Important**: Replace `movie-recommendation-api` with your actual backend service name from Step 3

3. **Add Rewrite Rule** (for React Router):
   - In the "Redirects/Rewrites" section, add:
     - **Source**: `/*`
     - **Destination**: `/index.html`
     - **Action**: `Rewrite`

4. **Deploy Frontend**
   - Click "Create Static Site"
   - Wait for deployment to complete

---

### Step 5: Update Backend CORS Settings

After frontend is deployed, you need to update the backend to allow requests from your frontend URL:

1. **Get Your Frontend URL**
   - From Render dashboard, copy your frontend URL (e.g., `https://movie-recommendation-frontend.onrender.com`)

2. **Update Backend CORS**
   - Go to your backend service in Render
   - Add/Update environment variable:
     ```
     FRONTEND_URL=https://your-frontend-url.onrender.com
     ```

3. **Update server.js** (if needed):
   - The current CORS configuration should work, but verify it allows your frontend URL
   - If you need to update, modify `backend/server.js`:
   ```javascript
   const corsOptions = {
       origin: process.env.FRONTEND_URL || 'http://localhost:3000',
       credentials: true,
       optionsSuccessStatus: 200
   };
   ```

4. **Redeploy Backend**
   - Render will automatically redeploy when you push changes

---

## 🎉 Your App is Live!

Your URLs will be:
- **Frontend**: `https://movie-recommendation-frontend.onrender.com`
- **Backend API**: `https://movie-recommendation-api.onrender.com`

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Backend won't start
- ✅ Check logs in Render dashboard
- ✅ Verify all environment variables are set correctly
- ✅ Ensure MongoDB connection string is correct
- ✅ Check that MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

**Problem**: Database connection fails
- ✅ In MongoDB Atlas, go to Network Access
- ✅ Add IP Address: `0.0.0.0/0` (allows all IPs - required for Render)
- ✅ Verify your database user has correct permissions

### Frontend Issues

**Problem**: Frontend shows blank page
- ✅ Check browser console for errors
- ✅ Verify `REACT_APP_API_URL` points to correct backend URL
- ✅ Ensure rewrite rule is set up for React Router

**Problem**: API calls fail (CORS errors)
- ✅ Update backend CORS settings with frontend URL
- ✅ Redeploy backend after updating CORS

### Free Tier Limitations

⚠️ **Important**: Render's free tier has limitations:
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month of runtime per service

**Solution**: Consider upgrading to paid tier for production apps, or use a service like [UptimeRobot](https://uptimerobot.com/) to ping your app every 14 minutes.

---

## 🔄 Continuous Deployment

Render automatically redeploys when you push to GitHub:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. Render automatically detects changes and redeploys

---

## 📊 Monitoring

- **View Logs**: Go to your service → Logs tab
- **Metrics**: Check CPU, Memory usage in Metrics tab
- **Events**: See deployment history in Events tab

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** - they're in `.gitignore`
2. **Use strong JWT_SECRET** - generate with: `openssl rand -base64 32`
3. **Keep MongoDB credentials secure** - use environment variables only
4. **Enable MongoDB IP whitelist** - but allow Render's IPs (0.0.0.0/0 for free tier)

---

## 📝 Environment Variables Reference

### Backend Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `10000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/movies` |
| `JWT_SECRET` | Secret for JWT tokens | `your-secret-key-here` |
| `TMDB_API_KEY` | The Movie DB API key | `your-tmdb-api-key` |
| `TMDB_BASE_URL` | TMDB API base URL | `https://api.themoviedb.org/3` |

### Frontend Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://movie-recommendation-api.onrender.com/api` |
| `REACT_APP_TMDB_IMAGE_BASE_URL` | TMDB image base URL | `https://image.tmdb.org/t/p/w500` |

---

## 🎓 Next Steps

After successful deployment:

1. ✅ Test all features (login, register, search, favorites, etc.)
2. ✅ Share your app URL with friends!
3. ✅ Monitor logs for any errors
4. ✅ Consider setting up custom domain (available in Render settings)
5. ✅ Set up monitoring/alerts for downtime

---

## 📞 Need Help?

- **Render Docs**: https://render.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **TMDB API Docs**: https://developers.themoviedb.org/3

---

## 🎊 Congratulations!

Your Movie Recommendation App is now live on the internet! 🚀

Share it with the world! 🌍