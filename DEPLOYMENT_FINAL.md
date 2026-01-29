# Final Deployment Guide for Render.com

This guide helps you deploy the Real-Time Chat App to Render using the easiest method (Blueprints) or manual setup.

## Option 1: The Easy Way (Blueprints) - Recommended

I have added a `render.yaml` file to the repository. This allows Render to auto-configure everything.

1.  **Push the latest code to GitHub** (if you haven't already).
2.  Log in to [Render Dashboard](https://dashboard.render.com).
3.  Click **New +** -> **Blueprint**.
4.  Connect your GitHub repository.
5.  Render will read the `render.yaml` and show you a list of "Environment Variables" to fill in.
6.  Fill in the values for:
    *   `MONGO_URI` (Your MongoDB connection string)
    *   `JWT_SECRET`
    *   `CLOUDINARY_CLOUD_NAME`
    *   `CLOUDINARY_API_KEY`
    *   `CLOUDINARY_API_SECRET`
    *   `CLIENT_URL` (You can set this to `https://<your-app-name>.onrender.com` once you know the name, or for now just put `http://localhost:5173`)
7.  Click **Apply**. Render will start building.

---

## Option 2: Manual Setup

If you prefer to configure it manually:

### 1. Create Web Service
1.  Go to [Render Dashboard](https://dashboard.render.com).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repo.

### 2. Configure Settings
*   **Name**: `real-time-chat`
*   **For "Root Directory"**: Leave it empty.
*   **Runtime**: `Node`
*   **Build Command**: `npm run build`
*   **Start Command**: `npm start`
*   **Instance Type**: Free

### 3. Environment Variables (Critical)
Scroll down to **Environment Variables** and add these:

| Key | Value | Notes |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Optimized mode |
| `MONGO_URI` | `...` | **Note:** Use `MONGO_URI`, not `MONGODB_URI` |
| `JWT_SECRET` | `...` | Secret key for tokens |
| `CLOUDINARY_CLOUD_NAME` | `...` | Cloudinary Config |
| `CLOUDINARY_API_KEY` | `...` | Cloudinary Config |
| `CLOUDINARY_API_SECRET` | `...` | Cloudinary Config |
| `CLIENT_URL` | `https://<your-app>.onrender.com` | Your app's future URL |
| `NODE_OPTIONS` | `--max-old-space-size=4096` | **REQUIRED** to prevent build crashes |

## Common Issues

*   **"Exited with status 1"**: Usually means `NODE_OPTIONS` is missing or dependencies failed.
*   **"Deployment Status: Incomplete"**: The backend is running, but it can't find the frontend files. Check that the build command `npm run build` succeeded and created `frontend/dist`.
