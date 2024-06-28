require("dotenv").config();
const fastify = require("fastify")({ logger: true });

const multer = require("multer");
const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
});
const upload = multer({ storage });

fastify.post("/storeVoice", upload.any("file"), async (req, res) => {
	res.send("done");
});

fastify.listen({ port: process.env.PORT, host: process.env.HOST });
