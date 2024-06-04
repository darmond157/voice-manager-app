const { GetObjectCommand } = require("@aws-sdk/client-s3");

module.exports = async (Bucket, Key, S3Client) => {
	const param = { Bucket, Key };

	S3Client.send(new GetObjectCommand(param))
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});

	// const ws = fs.createWriteStream(
	// 	__dirname + "/../files/download-from-nodejs-sdk.png"
	// );
	// data.Body.pipe(ws);
};
