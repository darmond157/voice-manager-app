module.exports = (port, host) => {
	const fastify = require("fastify")({ logger: true });

	const S3Client = require("./plugins/S3.js");

	require("./routes.js")(fastify,S3Client);

	fastify.listen({ port, host });
};
