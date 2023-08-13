import { withPlanetscale } from "@netlify/planetscale";

export const handler = withPlanetscale(async (event, context) => {
  const {
    planetscale: { connection },
  } = context;

  console.log("get locations function firing.");
  console.log(event);
  const { body } = event;

  if (!body) {
    return {
      statusCode: 400,
      body: "Missing body",
    };
  }

  const { user } = JSON.parse(body);

  console.log(user);

  const data = await connection.execute("SELECT * FROM locations WHERE user='Max' ORDER BY timestamp DESC", [user]);

  if(!data.rows[0]) {
    console.log(rows);
    console.log("rows[0] is false");
    return {
      statusCode: 404
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({locations: data.rows})

    }
  }
});
