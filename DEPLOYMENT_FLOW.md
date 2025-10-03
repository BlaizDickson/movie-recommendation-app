# 🎯 Deployment Flow Diagram

## Visual Overview of Deployment Process

```
┌─────────────────────────────────────────────────────────────────┐
│                     PREPARATION PHASE                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  1. Get MongoDB Connection String       │
        │     (MongoDB Atlas)                     │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  2. Get TMDB API Key                    │
        │     (themoviedb.org)                    │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  3. Push Code to GitHub                 │
        │     (git push origin main)              │
        └─────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     RENDER DEPLOYMENT                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  4. Login to Render Dashboard           │
        │     (dashboard.render.com)              │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  5. Click "New +" → "Blueprint"         │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  6. Connect GitHub Repository           │
        │     (movie-recommendation-app)          │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  7. Render Detects render.yaml          │
        │     (Automatic Configuration)           │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  8. Set Environment Variables           │
        │     • MONGODB_URI                       │
        │     • TMDB_API_KEY                      │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  9. Click "Apply"                       │
        └─────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BUILD PHASE                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
        ┌──────────────────┐  ┌──────────────────┐
        │  Backend Build   │  │  Frontend Build  │
        │  (5-7 minutes)   │  │  (5-7 minutes)   │
        └──────────────────┘  └──────────────────┘
                    │                   │
                    │                   │
                    ▼                   ▼
        ┌──────────────────┐  ┌──────────────────┐
        │  Backend Deploy  │  │  Frontend Deploy │
        │  ✅ API Ready    │  │  ✅ Site Ready   │
        └──────────────────┘  └──────────────────┘
                    │                   │
                    └─────────┬─────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     POST-DEPLOYMENT                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  10. Copy Backend URL                   │
        │      (movie-recommendation-api          │
        │       .onrender.com)                    │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  11. Copy Frontend URL                  │
        │      (movie-recommendation-frontend     │
        │       .onrender.com)                    │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  12. Test Your Live App! 🎉             │
        │      • Register/Login                   │
        │      • Browse Movies                    │
        │      • Add Favorites                    │
        └─────────────────────────────────────────┘
```

---

## 🔄 Continuous Deployment Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                  MAKE CODE CHANGES                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  git add .                              │
        │  git commit -m "Your changes"           │
        │  git push origin main                   │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  Render Detects Changes                 │
        │  (Automatic Trigger)                    │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  Render Rebuilds & Redeploys            │
        │  (5-10 minutes)                         │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  Changes Live! ✅                       │
        └─────────────────────────────────────────┘
```

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              FRONTEND (Render Static Site)                       │
│                                                                  │
│  • React Application                                            │
│  • Tailwind CSS                                                 │
│  • React Router                                                 │
│  • URL: movie-recommendation-frontend.onrender.com              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ API Calls
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND (Render Web Service)                        │
│                                                                  │
│  • Node.js + Express                                            │
│  • JWT Authentication                                           │
│  • REST API                                                     │
│  • URL: movie-recommendation-api.onrender.com                   │
└─────────────────────────────────────────────────────────────────┘
                    │                           │
                    │                           │
                    ▼                           ▼
        ┌──────────────────┐      ┌──────────────────────┐
        │  MongoDB Atlas   │      │   TMDB API           │
        │  (Database)      │      │   (Movie Data)       │
        │                  │      │                      │
        │  • User Data     │      │  • Movie Info        │
        │  • Favorites     │      │  • Posters           │
        │  • Watchlist     │      │  • Details           │
        │  • Reviews       │      │  • Search            │
        └──────────────────┘      └──────────────────────┘
```

---

## ⚡ Quick Reference

### Time Estimates
- **Initial Setup**: 30-45 minutes
- **Backend Build**: 5-7 minutes
- **Frontend Build**: 5-7 minutes
- **Total First Deploy**: ~15-20 minutes
- **Subsequent Deploys**: 5-10 minutes

### URLs You'll Get
```
Backend:  https://movie-recommendation-api.onrender.com
Frontend: https://movie-recommendation-frontend.onrender.com
```

### Required Credentials
1. ✅ MongoDB Connection String
2. ✅ TMDB API Key
3. ✅ JWT Secret (auto-generated by Render)

---

## 🎯 Success Indicators

Your deployment is successful when you see:

```
✅ Backend Service: Live
✅ Frontend Service: Live
✅ Database: Connected
✅ API: Responding
✅ Frontend: Loading
✅ Movies: Displaying
✅ Auth: Working
```

---

## 📞 Quick Help

**Stuck?** Check these in order:
1. Environment variables set correctly?
2. MongoDB allows connections from 0.0.0.0/0?
3. Check Render logs for errors
4. Verify GitHub repository is up to date
5. See DEPLOYMENT_GUIDE.md for detailed troubleshooting

---

**Ready to deploy?** Follow the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)! 🚀