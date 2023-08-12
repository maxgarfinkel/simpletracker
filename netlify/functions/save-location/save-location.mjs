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

  await connection.execute("INSERT INTO locations (`lat`, `long`, `user`) VALUES (?, ?, ?)", [
    lat,
    long,
    user
  ]);

  return {
    statusCode: 201,
  };
});
