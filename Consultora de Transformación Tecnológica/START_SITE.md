# How to View Your Site - Windows Instructions

## Quick Start (2 Terminal Windows)

### Terminal 1: Start Backend

```powershell
cd backend
mvn spring-boot:run
```

**Wait for:** `Started AiConsultancyApplication` message

✅ Backend running at: **http://localhost:8080**

---

### Terminal 2: Start Frontend

```powershell
cd frontend
npm install
npm start
```

**Wait for:** Browser to automatically open or go to **http://localhost:3000**

✅ Frontend running at: **http://localhost:3000**

---

## View Your Site

1. **Open browser** → **http://localhost:3000**
2. You'll see your landing page!

---

## What You Can Test

✅ **Language Toggle** - Click EN/ES button in navbar  
✅ **Chatbot** - Click chat icon (bottom right)  
✅ **Contact Form** - Fill and submit the quote request  
✅ **Smooth Scrolling** - Click navbar links  

---

## If Something Doesn't Work

### Backend Issues
- Make sure Java 17+ is installed: `java -version`
- Make sure Maven is installed: `mvn -version`
- If port 8080 is busy, change it in `backend/src/main/resources/application.properties`

### Frontend Issues
- Make sure Node.js is installed: `node -version`
- If `npm install` fails, try: `npm install --legacy-peer-deps`
- Clear cache: Delete `node_modules` folder, then run `npm install` again

### Can't See the Site
- Make sure BOTH terminals are running (backend AND frontend)
- Check that backend shows "Started" message
- Check browser console (F12) for errors

---

## Stop the Servers

Press `Ctrl+C` in each terminal window to stop the servers.

---

**That's it! Your site should be running! 🎉**
