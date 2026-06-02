# 🚀 Deployment Guide — SkyTemp

Backend → **Render** | Frontend → **Vercel**

---

## PART 1 — Backend on Render

### Step 1: render.com pe jao
- **[render.com](https://render.com)** open karo
- **Sign Up** karo (GitHub se login karo — easy hoga)

### Step 2: New Web Service banao
1. Dashboard mein **"New +"** click karo
2. **"Web Service"** select karo
3. **"Connect a repository"** → `SkyTemp` select karo
4. GitHub access dedo agar pehli baar hai

### Step 3: Settings fill karo

| Field | Value |
|-------|-------|
| **Name** | `skytemp-backend` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | `Free` |

### Step 4: Environment Variable add karo
- **"Environment"** tab mein jao
- **"Add Environment Variable"** click karo:

| Key | Value |
|-----|-------|
| `OPENWEATHER_API_KEY` | `your_actual_api_key` |
| `ALLOWED_ORIGIN` | *(baad mein Vercel URL dalenge)* |

### Step 5: Deploy karo
- **"Create Web Service"** click karo
- 2-3 minute wait karo
- ✅ Deploy hone ke baad URL milega jaise:
  ```
  https://skytemp-backend.onrender.com
  ```
- Yeh URL copy karke rakh lo — frontend mein kaam aayega

---

## PART 2 — Frontend on Vercel

### Step 1: vercel.com pe jao
- **[vercel.com](https://vercel.com)** open karo
- **Sign Up** karo (GitHub se login karo)

### Step 2: New Project banao
1. Dashboard mein **"Add New → Project"** click karo
2. `SkyTemp` repository select karo → **"Import"**

### Step 3: Settings fill karo

| Field | Value |
|-------|-------|
| **Framework Preset** | `Vite` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### Step 4: Environment Variable add karo
- **"Environment Variables"** section mein:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://skytemp-backend.onrender.com` |

> ⚠️ Render ka URL yahan daalo jo Step 1 Part 5 mein mila tha

### Step 5: Deploy karo
- **"Deploy"** click karo
- 1-2 minute mein deploy hoga
- ✅ URL milega jaise:
  ```
  https://skytemp.vercel.app
  ```

---

## PART 3 — Final Connection (Important!)

Frontend deploy hone ke baad Vercel ka URL lena hai aur Render mein update karna hai:

1. **Render Dashboard** → `skytemp-backend` → **Environment** tab
2. `ALLOWED_ORIGIN` mein **Vercel URL** daalo:
   ```
   https://skytemp.vercel.app
   ```
3. **Save** karo — Render automatically redeploy kar dega

---

## PART 4 — vite.config.js Update (Code Change)

Vercel pe production mein Vite proxy kaam nahi karta. Frontend ko directly Render backend URL call karna hoga.

