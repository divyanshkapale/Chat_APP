# Final Deployment Guide for Render.com

This guide assumes you are starting fresh. Be sure to follow **Step 4** carefully, as it fixes the memory crash issue.

## Step 1: Push Code to GitHub

(I have already prepared and pushed the code for you. Verify it is on valid on GitHub).

## Step 2: Create Web Service on Render

1.  Log in to [dashboard.render.com](https://dashboard.render.com).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository: `divyanshkapale/Chat_APP` (or the correct repo).

## Step 3: Configure Service Settings

Use these EXACT settings:

*   **Name**: `real-time-chat` (or any name)
*   **Region**: Closest to you (e.g., Singapore, Frankfurt)
*   **Branch**: `main`
*   **Root Directory**: *(Leave Empty / Default)*
*   **Runtime**: `Node`
*   **Build Command**: `npm run build`
*   **Start Command**: `npm start`
*   **Instance Type**: Free

## Step 4: Environment Variables (CRITICAL)

Scroll down to "Environment Variables" and verify/add these. **The last one is the fix for the crash.**

| Key | Value | Notes |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Tells app to use optimized mode |
| `MONGODB_URI` | `...` | Your MongoDB Connection String |
| `JWT_SECRET` | `...` | Your secret key |
| `CLOUDINARY_CLOUD_NAME` | `...` | Your content |
| `CLOUDINARY_API_KEY` | `...` | Your content |
| `CLOUDINARY_API_SECRET` | `...` | Your content |
| `NODE_OPTIONS` | `--max-old-space-size=4096` | **REQUIRED** to prevent build crash |

## Step 5: Deploy

1.  Click **Create Web Service**.
2.  Wait for the build. It might take 3-5 minutes.
3.  Once it says **Live**, click the URL at the top left.

## Troubleshooting

*   **"Exited with status 1" during Build**: This means you skipped adding `NODE_OPTIONS`. Go back to Environment Variables and add it, then redeploy.
*   **"Deployment Status: Incomplete"**: This means the build finished but the `frontend/dist` folder wasn't created. Check logs for "npm run build" errors.
