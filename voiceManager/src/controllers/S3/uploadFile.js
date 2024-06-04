const {
	CompleteMultipartUploadCommand,
	CreateMultipartUploadCommand,
	UploadPartCommand,
} = require("@aws-sdk/client-s3");

const fs = require("fs");

// File
var fileName = "file_name";
var filePath = "./" + fileName;
var fileKey = fileName;
var buffer = fs.readFileSync(filePath);

// S3 Upload options
var bucket = "voices";

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

async function completeMultipartUpload(s3, doneParams) {
	await s3.send(new CompleteMultipartUploadCommand(doneParams));
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
