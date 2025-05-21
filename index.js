import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.set("trust proxy", true);

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
});

app.get("/", async (req, res) => {
	const userIP =
		req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

	try {
		const geo = await fetch(`http://ip-api.com/json/${userIP}`);
		const data = await geo.json();
		const now = new Date().toLocaleString();

		const message = `
			✅ New visitor logged:

			📍 IP: ${userIP}
			🌎 Country: ${data.country}
			🏙️ City: ${data.city}
			🏢 ISP: ${data.isp}
			🕒 Time: ${now}
    	`.trim();

		// Send email
		await transporter.sendMail({
			from: `"IP Logger" <${process.env.GMAIL_USER}>`,
			to: process.env.GMAIL_TO,
			subject: "📩 New IP Visit Logged",
			text: message,
		});

		console.log(`[GMAIL SENT] ${message}`);

		// Send simple HTML response to visitor
		res.send(`<h2>Your IP has been logged. Thank you!</h2>`);
	} catch (e) {
		console.error("❌ Error during IP logging or email:", e);
		res.status(500).send("Error logging IP.");
	}
});

app.listen(PORT, () => {
	console.log(`✅ Server is running on port ${PORT}`);
});
