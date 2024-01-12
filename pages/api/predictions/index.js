import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error(
        "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
      );
    }

    // const prediction = await replicate.predictions.create({
    //   // Pinned to a specific version of Stable Diffusion
    //   // See https://replicate.com/stability-ai/sdxl
    //   version: "8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f",
    //
    //   // This is the text prompt that will be submitted by a form on the frontend
    //   input: { prompt: req.body.prompt },
    // });

    const input = {
      max_new_tokens: 600,
      prompt: `
        As your Portuguese language coach, my role is to guide you through practical language scenarios, like ordering coffee at a cafe. In this simulated interaction, I'll take on the role of the coffee shop owner, and you'll be the customer. Here's how our conversation will unfold:

        Throughout our dialogue:

        If you switch to English, I'll assist you in translating and guide you on the correct Portuguese expression.
        Instead of providing complete sentences, I'll present various options or ideas for responses to different situations.
        Our conversation won't always follow your requests, adding an element of creativity and realism.
        Small talk and cultural aspects will be integrated to make our conversation engaging and to provide insights into Portuguese culture.
        Translations will be provided when speaking Portuguese to aid your understanding. Give me options I could response in Portuguese, but show me also what this means in english. I'll consistently ask questions related to the scenario to keep the conversation dynamic and facilitate learning and tell you what you have done wrong.  I'll automatically correct any mistakes you make and offer suggestions for improvement. Start our conversation by explaining its context in Portuguese and in English, then ask me a question to start the dialog, after give 3 options of possible answers to your question.

        ${req.body.prompt}
      `
    };

    const model =
      "istralai/mistral-7b-instruct-v0.2:79052a3adbba8116ebc6697dcba67ad0d58feff23e7aeb2f103fc9aa545f9269";
    const output = await replicate.run(model, { input });
    console.log(output);
    const string = output.join("");
    console.log(string);

    // console.log(await replicate.stream("mistralai/mistral-7b-instruct-v0.2", { input }))

    // for await (const event of replicate.stream("mistralai/mistral-7b-instruct-v0.2", { input })) {
    //   process.stdout.write(event.toString());
    // };

    // if (prediction?.error) {
    //   res.statusCode = 500;
    //   res.end(JSON.stringify({ detail: prediction.error }));
    //   return;
    // }
    //
    // res.statusCode = 201;
    res.end(JSON.stringify(string));
  } catch (e) {
    console.error(e);
  }
}
