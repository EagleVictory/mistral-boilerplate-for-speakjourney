import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const response = await fetch(
    "https://api.replicate.com/v1/models/mistralai/mistral-7b-instruct-v0.2/predictions",
    {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Pinned to a specific version of Stable Diffusion
        // See https://replicate.com/stability-ai/sdxl
        version:
          "79052a3adbba8116ebc6697dcba67ad0d58feff23e7aeb2f103fc9aa545f9269",

        // This is the text prompt that will be submitted by a form on the frontend
        input: { prompt: body.prompt },
      }),
    }
  );
  console.log(response);

  if (response.status !== 201) {
    let error = await response.json();
    // res.statusCode = 500;
    return NextResponse.json({ detail: error.detail });
  }
  const prediction = await response.json();
  // res.statusCode = 201;
  return NextResponse.json(prediction);

  // return JSON.stringify(prediction)
}
