import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", true);

app.get("/", async (req, res) => {
	const userIP =
		req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

	try {
		const geo = await fetch(`http://ip-api.com/json/${userIP}`);
		const data = await geo.json();

		console.log(`IP: ${userIP}`);
		console.log("Location info:", data);

		res.json({
			ip: userIP,
			country: data.country,
			region: data.regionName,
			city: data.city,
			isp: data.isp,
			lat: data.lat,
			lon: data.lon,
		});
	} catch (err) {
		console.error("Geo API failed", err);
		res.status(500).send("Không thể truy xuất thông tin IP.");
	}
});

app.listen(PORT, () => {
	console.log(`Server đang chạy tại cổng ${PORT}`);
});
