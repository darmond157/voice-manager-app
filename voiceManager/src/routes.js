const downloadFile = require("./controllers/S3/downloadFile.js");

module.exports = (fastify,S3Client) => {
	fastify.get("/voices", (req, res) => {
		// const Bucket = req.body.Bucket;
		// const Key = req.body.Key;
		const Bucket = 'voice-mobile-project';
		const Key = 'RE_Project_1402-2.pdf';

		downloadFile(Bucket, Key,S3Client);
	});
};
