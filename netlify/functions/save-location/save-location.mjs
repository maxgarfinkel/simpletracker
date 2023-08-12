import { withPlanetscale } from "@netlify/planetscale";

export const handler = withPlanetscale(async (event, context) => {
  const {
    planetscale: { connection },
  } = context;

  const { body } = event;

  if (!body) {
    return {
      statusCode: 400,
      body: "Missing body",
    };
  }

  const { user, lat, long } = JSON.parse(body);

  await connection.execute("INSERT INTO locations (user, lat, long) VALUES (?, ?, ?)", [
    user,
    lat,
    long
  ]);

  return {
    statusCode: 201,
  };
});
