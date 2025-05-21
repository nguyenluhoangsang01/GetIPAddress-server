import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 8080;

app.set("trust proxy", true);

app.get("/", async (req, res) => {
	const userIP =
		req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

	try {
		const geo = await fetch(`http://ip-api.com/json/${userIP}`);
		const data = await geo.json();

		res.json({
			ip: userIP,
			country: data.country,
			city: data.city,
			isp: data.isp,
		});
	} catch (e) {
		console.error(e);
		res.status(500).send("Không thể truy xuất IP.");
	}
});

app.listen(PORT, () => {
	console.log(`✅ Server đang chạy tại cổng ${PORT}`);
});
