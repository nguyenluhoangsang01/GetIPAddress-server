# 🌐 IP Logger & Lookup Server

An advanced Express server that silently logs visitor IPs, collects geolocation and device info, sends it to your email, and optionally redirects users. It also supports manual IP lookups.

---

## ✅ Features

- 🔒 Logs visitor IP, location, browser, OS, language, and referrer
- 🕒 Shows local time based on visitor's timezone
- 📩 Sends a full log report to your Gmail inbox
- 🔁 Automatically redirects visitors after logging (e.g., to Google)
- 🌎 Provides `/lookup/:ip` API to manually check IP info

---

## 📦 Technologies

- Node.js + Express
- Nodemailer (Gmail SMTP)
- IP-API.com (for IP info)
- ua-parser-js (for browser/device detection)
- Luxon (for timezone-aware local time)
- dotenv (for environment config)

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
```

### 3. Create a `.env` file

```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
GMAIL_TO=your-email@gmail.com
```

> ⚠️ Use [App Passwords](https://support.google.com/accounts/answer/185833) with Gmail if you have 2FA enabled.

### 4. Start the server

```bash
npm start
```

---

## 🔗 API Routes

### `/` (GET)
Logs the visitor's IP and metadata, sends email, then redirects to Google.

### `/lookup/:ip` (GET)
Returns public IP info for any IP address.

**Example:**
```
GET /lookup/8.8.8.8
```

---

## 📬 Sample Email Output

```
✅ New visitor logged:

📍 IP: xxxxxxxxxx
🌎 Country: xxxxxxxxxx
🏙️ City: xxxxxxxxxx
🏢 ISP: xxxxxxxxxx
🕒 Local Time: xxxxxxxxxx

🧠 Device: xxxxxxxxxx
🛠️ OS: xxxxxxxxxx
🌐 Browser: xxxxxxxxxx

🔗 Referrer: xxxxxxxxxx
🗣️ Language: xxxxxxxxxx
```

---

## 🛠 Deployment

You can deploy this to platforms like:

- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Vercel (via serverless)](https://vercel.com/)

Make sure to add `.env` variables to your project dashboard.

---

## ⚠️ Legal Disclaimer

This tool is for **educational or ethical use only**. Do not log or track users without proper notice and consent. Always follow privacy laws like **GDPR**, **CCPA**, and your local jurisdiction.

---

## 📄 License

MIT License