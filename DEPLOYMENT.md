# Deployment Guide (Render.com)

This guide explains how to deploy your Real-Time Chat App to Render.com as a single full-stack web service.

## Prerequisites

1.  A GitHub account.
2.  A [Render.com](https://render.com) account.
3.  Your project pushed to a GitHub repository.

## Step 1: Prepare Your Code

(These steps have already been handled by the AI, but ensure you push the changes)

1.  The `package.json` in the root directory orchestrates the build.
2.  The backend is configured to serve the frontend static files in production.
3.  The frontend is configured to communicate with the same origin `/api` in production.

## Step 2: Create a Web Service on Render

1.  Log in to your Render dashboard.
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    *   **Name**: Choose a name (e.g., `real-time-chat`).
    *   **Region**: Select the one closest to your users.
    *   **Branch**: `main` (or your working branch).
    *   **Root Directory**: Leave blank (defaults to `.`).
    *   **Runtime**: `Node`.
    *   **Build Command**: `npm run build`
        *   *(This runs the script in the root package.json which installs dependencies and builds the frontend)*
    *   **Start Command**: `npm start`
        *   *(This runs the backend server)*

## Step 3: Configure Environment Variables

Scroll down to the **Environment Variables** section and add the following keys. You can find these values in your local `.env` file (do NOT commit `.env` to GitHub).

| Key | Value Description |
| :--- | :--- |
| `NODE_ENV` | Set this to `production` |
| `PORT` | Set this to `3000` (optional, Render usually sets this automatically but 3000 is our default) |
| `MONGODB_URI` | Your MongoDB connection string. |
| `JWT_SECRET` | Your secret key for JWT. |
| `CLOUDINARY_CLOUD_NAME`| Your Cloudinary Cloud Name. |
| `CLOUDINARY_API_KEY` | Your Cloudinary API Key. |
| `CLOUDINARY_API_SECRET`| Your Cloudinary API Secret. |
| `CLIENT_URL` | The URL of your deployed app (e.g., `https://your-app-name.onrender.com`). |

## Step 4: Deploy

1.  Click **Create Web Service**.
2.  Render will start building your app. You can watch the logs.
3.  Once the build finishes and the service is live, you can access your chat app at the provided URL!

## Troubleshooting

*   **Build Failed**: Check the logs. Ensure `npm run build` works locally.
*   **Application Error**: Check the "Logs" tab in Render. It might be a database connection issue (allow access from anywhere 0.0.0.0/0 in MongoDB Atlas Network Access) or a missing environment variable.
