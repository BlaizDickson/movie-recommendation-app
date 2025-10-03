# ✅ Deployment Checklist

Use this checklist to ensure you have everything ready before deploying.

## 📋 Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
- [ ] MongoDB Atlas account created
- [ ] Database cluster created
- [ ] Database user created with password
- [ ] Connection string copied
- [ ] Network Access configured (IP: 0.0.0.0/0 for Render)

### 2. TMDB API Setup
- [ ] TMDB account created at https://www.themoviedb.org
- [ ] API key generated from Settings → API
- [ ] API key copied and saved securely

### 3. GitHub Repository
- [ ] All code committed to GitHub
- [ ] Repository is public or Render has access
- [ ] Latest changes pushed to main branch
- [ ] `.env` files are NOT committed (check .gitignore)

### 4. Render Account
- [ ] Render account created at https://render.com
- [ ] GitHub account connected to Render
- [ ] Payment method added (even for free tier)

---

## 🚀 Deployment Steps Checklist

### Backend Deployment
- [ ] Created new Web Service on Render
- [ ] Connected GitHub repository
- [ ] Set build command: `cd backend && npm install`
- [ ] Set start command: `cd backend && npm start`
- [ ] Added environment variables:
  - [ ] NODE_ENV=production
  - [ ] PORT=10000
  - [ ] MONGODB_URI=(your connection string)
  - [ ] JWT_SECRET=(generated secure string)
  - [ ] TMDB_API_KEY=(your TMDB key)
  - [ ] TMDB_BASE_URL=https://api.themoviedb.org/3
- [ ] Backend deployed successfully
- [ ] Backend URL copied (e.g., https://movie-recommendation-api.onrender.com)
- [ ] Tested backend health endpoint (visit backend URL in browser)

### Frontend Deployment
- [ ] Created new Static Site on Render
- [ ] Connected GitHub repository
- [ ] Set build command: `cd frontend && npm install && npm run build`
- [ ] Set publish directory: `frontend/build`
- [ ] Added environment variables:
  - [ ] REACT_APP_API_URL=(your backend URL + /api)
  - [ ] REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
- [ ] Added rewrite rule: /* → /index.html
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied

### Post-Deployment Configuration
- [ ] Updated backend CORS with frontend URL
- [ ] Tested the live application
- [ ] Verified all features work:
  - [ ] User registration
  - [ ] User login
  - [ ] Browse movies
  - [ ] Search movies
  - [ ] View movie details
  - [ ] Add to favorites
  - [ ] Add to watchlist
  - [ ] Write reviews
  - [ ] View profile

---

## 🔍 Testing Checklist

After deployment, test these features:

### Authentication
- [ ] Register new account works
- [ ] Login works
- [ ] Logout works
- [ ] Protected routes redirect to login when not authenticated
- [ ] Token persists after page refresh

### Movie Features
- [ ] Popular movies load on homepage
- [ ] Search functionality works
- [ ] Movie details page loads
- [ ] Movie images display correctly
- [ ] Similar movies show up

### User Features
- [ ] Can add movies to favorites
- [ ] Can remove from favorites
- [ ] Can add movies to watchlist
- [ ] Can remove from watchlist
- [ ] Can write/edit reviews
- [ ] Can delete reviews
- [ ] Profile page shows correct stats

### UI/UX
- [ ] Responsive design works on mobile
- [ ] All navigation links work
- [ ] Loading states display properly
- [ ] Error messages show when needed
- [ ] Images load correctly

---

## 🐛 Common Issues & Solutions

### Issue: Backend won't start
**Check:**
- [ ] All environment variables are set
- [ ] MongoDB connection string is correct
- [ ] MongoDB allows connections from 0.0.0.0/0

### Issue: Frontend shows blank page
**Check:**
- [ ] Browser console for errors
- [ ] REACT_APP_API_URL is correct
- [ ] Rewrite rule is configured

### Issue: CORS errors
**Check:**
- [ ] Backend CORS includes frontend URL
- [ ] Backend redeployed after CORS update

### Issue: Database connection fails
**Check:**
- [ ] MongoDB Atlas Network Access allows 0.0.0.0/0
- [ ] Database user credentials are correct
- [ ] Connection string format is correct

---

## 📝 Important URLs to Save

After deployment, save these URLs:

```
Frontend URL: _________________________________
Backend URL:  _________________________________
MongoDB URI:  _________________________________
GitHub Repo:  _________________________________
```

---

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Frontend loads without errors
- ✅ You can register and login
- ✅ Movies display on the homepage
- ✅ Search returns results
- ✅ You can add movies to favorites/watchlist
- ✅ Profile page shows your data
- ✅ No console errors in browser
- ✅ No errors in Render logs

---

## 📞 Support Resources

- **Render Documentation**: https://render.com/docs
- **MongoDB Atlas Help**: https://docs.atlas.mongodb.com/
- **TMDB API Docs**: https://developers.themoviedb.org/3
- **React Deployment**: https://create-react-app.dev/docs/deployment/

---

**Last Updated**: Ready for deployment! 🚀