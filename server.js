const fastify = require("fastify")({ logger: true });

fastify.register(require("@fastify/postgres"), {
	connectionString: "postgres://postgres@localhost/postgres",
});

fastify.post("/voice-detail", async (req, res) => {
	const { name, description, date } = req.body;
	await fastify.pg
		.query(
			"INSERT INTO voiceDetails (name,description,date) VALUES ($1,$2,$3)",
			[name, description, date]
		)
		.then(() => {
			res.send("voice detail added successfuly");
		})
		.catch((err) => {
			res.send(err);
		});
});

fastify.get("/voice-details");

fastify.listen({ port: 3000, host: "0.0.0.0" });
