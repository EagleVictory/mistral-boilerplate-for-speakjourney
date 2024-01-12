import { NextResponse } from "next/server";

export async function POST({ params }) {
  console.log("api called");
  // console.log("DYNAMIC ROUTE", params.id);

  const response = await fetch(
    "https://api.replicate.com/v1/predictions/" + params.id,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status !== 200) {
    let error = await response.json();
    // res.statusCode = 500;
    // res.end(JSON.stringify({ detail: error.detail }));
    return NextResponse.json({ detail: error.detail });
  }

  const prediction = await response.json();
  // res.end(JSON.stringify(prediction));
  return NextResponse.json(prediction);
}
