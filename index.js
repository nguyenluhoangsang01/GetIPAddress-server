import express from "express";
const app = express();

app.get("/", (req, res) => {
	const userIP =
		req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
	console.log(`Địa chỉ IP của người dùng: ${userIP}`);
	res.send("Chào bạn! IP của bạn đã được ghi lại cho mục đích thống kê.");
});

app.listen(3000, () => {
	console.log("Server đang chạy tại http://localhost:3000");
});
