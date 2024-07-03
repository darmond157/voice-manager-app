const fastify = require("fastify")({ logger: true });

fastify.register(require("@fastify/postgres"), {
	connectionString: "postgres://postgres@localhost/postgres",
});

fastify.post("/voice-details", async (req, res) => {
	const { name, description, date } = req.body;
	if (!(name && description && date))
		return res.send("please provide all fields ...");
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

fastify.get("/voice-details/:name", async (req, res) => {
	const name = req.params.name;
	await fastify.pg
		.query("SELECT * FROM voiceDetails WHERE name=$1", [name])
		.then((result) => {
			res.send(result.rows[0]);
		})
		.catch((err) => {
			res.send(err);
		});
});

fastify.delete("/voice-details/:name", async (req, res) => {
	const name = req.params.name;
	await fastify.pg
		.query("DELETE FROM voiceDetails WHERE name=$1", [name])
		.then(() => {
			res.send("voice detail deleted successfuly ...");
		})
		.catch((err) => {
			res.send(err);
		});
});

fastify.get("/voice-details", async (req, res) => {
	await fastify.pg
		.query("SELECT * FROM voiceDetails")
		.then((result) => {
			res.send(result.rows);
		})
		.catch((err) => {
			res.send(err);
		});
});

fastify.listen({ port: 3000, host: "0.0.0.0" });
