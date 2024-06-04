const fastify = require("fastify")({ logger: true });
require("dotenv").config();
const {
	S3Client,
	CompleteMultipartUploadCommand,
	CreateMultipartUploadCommand,
	UploadPartCommand,
	GetObjectCommand,
} = require("@aws-sdk/client-s3");
const path = require("path");
const fs = require("fs");
const s3 = new S3Client({
	region: process.env.S3_REGION,
	endpoint: process.env.S3_END_POINT,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY,
		secretAccessKey: process.env.S3_SECRET_KEY,
	},
});

// File
var fileName = "file_name";
var filePath = "./" + fileName;
var fileKey = fileName;
var buffer = fs.readFileSync(filePath);
// S3 Upload options
var bucket = "bucket_name";

// Upload
var startTime = new Date();
var partNum = 0;
var partSize = 1024 * 1024 * 5; // Minimum 5MB per chunk (except the last part) http://docs.aws.amazon.com/AmazonS3/latest/API/mpUploadComplete.html
var numPartsLeft = Math.ceil(buffer.length / partSize);
var maxUploadTries = 3;
var multiPartParams = {
	Bucket: bucket,
	Key: fileKey,
};
var multipartMap = {
	Parts: [],
};

async function completeMultipartUpload(s3, doneParams) {
	console.log(doneParams);
	const completeMultipartUploadResponse = await s3.send(
		new CompleteMultipartUploadCommand(doneParams)
	);

	var delta = (new Date() - startTime) / 1000;
	console.log("Completed upload in", delta, "seconds");
	console.log("Final upload data:", completeMultipartUploadResponse);
}

async function uploadPart(s3, multipart, partParams, tryNum) {
	var tryNum = tryNum || 1;

	const uploadPartResponse = await s3.send(new UploadPartCommand(partParams));

	console.log(partParams);

	multipartMap.Parts[partParams.PartNumber - 1] = {
		ETag: uploadPartResponse.ETag,
		PartNumber: Number(partParams.PartNumber),
	};
	console.log("Completed part", partParams.PartNumber);
	console.log("mData", uploadPartResponse);
	if (--numPartsLeft > 0) return; // complete only when all parts uploaded

	var doneParams = {
		Bucket: bucket,
		Key: fileKey,
		MultipartUpload: multipartMap,
		UploadId: multipart.UploadId,
	};

	console.log("Completing upload...");
	completeMultipartUpload(s3, doneParams);
}

// Multipart
console.log("Creating multipart upload for:", fileKey);
let createMultipartUploadResponse = {};

s3.send(new CreateMultipartUploadCommand(multiPartParams)).then((value) => {
	const createMultipartUploadResponse = value;

	for (var rangeStart = 0; rangeStart < buffer.length; rangeStart += partSize) {
		partNum++;
		var end = Math.min(rangeStart + partSize, buffer.length),
			partParams = {
				Body: buffer.slice(rangeStart, end),
				Bucket: bucket,
				Key: fileKey,
				PartNumber: String(partNum),
				UploadId: createMultipartUploadResponse.UploadId,
			};

		// Send a single part
		console.log(
			"Uploading part: #",
			partParams.PartNumber,
			", Range start:",
			rangeStart
		);
		uploadPart(s3, createMultipartUploadResponse, partParams);
	}
});

const param = { Bucket: 'sample_bucket', Key: 'file.png' };

// call S3 to retrieve upload file to specified bucket
const run = async () => {
  try {
      const data = await s3.send(new GetObjectCommand(param));
      const ws = fs.createWriteStream(
          __dirname + '/../files/download-from-nodejs-sdk.png'
      );
      data.Body.pipe(ws);
      console.log('Success');
  } catch (err) {
      console.log('Error', err);
  }
};

fastify.get("/", (req, res) => {
	res.send("hello");
});

fastify.listen({ port: 3000, host: "0.0.0.0" });
