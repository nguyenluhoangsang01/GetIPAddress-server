# 🌐 IP Logger & Lookup Server

A simple Express server that logs visitor IPs silently and sends detailed information (location, device, etc.) via email. Also includes an API to manually look up any IP address.

---

## ✅ Features

- 🔒 Logs visitor IP, location, browser, and device silently
- 📩 Sends IP details to your email using Gmail
- 🌎 Includes `/lookup/:ip` route to manually check IP info
- ⚙️ Easy to deploy on Railway or Vercel
- 🧪 No data shown to visitor (silent logging with `204`)

---

## 📦 Technologies

- Node.js + Express
- Nodemailer (Gmail SMTP)
- IP-API.com (for IP info)
- ua-parser-js (to parse User-Agent)
- dotenv

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/nguyenluhoangsang01/GetIPAddress-server.git
cd GetIPAddress-server
```

### 2. Install dependencies

```bash
npm i
npm run dev
```

### 3. Create `.env` file

```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
GMAIL_TO=your-email@gmail.com
```

> ⚠️ Use [App Passwords](https://support.google.com/accounts/answer/185833) with Gmail — not your actual password!

### 4. Run the server

```bash
npm start
```

---

## 📬 Email Output Example

```
✅ New visitor logged:

📍 IP:
🌎 Country:
🏙️ City:
🏢 ISP:
🕒 Time:

🧠 Device:
🛠️ OS:
🌐 Browser:

🔗 Referrer:
🗣️ Language:
```

---

## 🌐 API Routes

### `/` (GET)

Logs the current visitor's IP and info. Returns nothing (204).

### `/lookup/:ip` (GET)

Returns geolocation info about any given IP.

**Example:**
```
GET /lookup/:ip
```

---

## 🛠 Deployment (Railway)

1. Connect repo to [Railway](https://railway.app/)
2. Add `.env` variables in Railway Dashboard
3. Deploy and test the live URL

---

## 🧠 Future Ideas

- Save logs to a database (MongoDB, SQLite, Supabase)
- Add Telegram/Discord alerts
- UI dashboard to view logs
- IP blocklist feature

---

## ⚠️ Legal Note

This project is for educational or ethical use only. Do **not** use this tool to log or track users without consent, especially in production environments. Always follow local privacy laws (e.g. GDPR, CCPA).

---

## 📄 License

MIT License