// import { openai } from "./openai.js";

// export async function createEmbedding(text) {
//   const response = await openai.embeddings.create({
//     model: "text-embedding-3-small",
//     input: text,
//   });
//   return response.data[0].embedding;
// }

import { pipeline } from "@xenova/transformers";

let embedder;

async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline(
      "feature-extraction",
      "sentence-transformers/all-MiniLM-L6-v2",
      {
        quantized: false, // 🔥 IMPORTANT FIX
      }
    );
  }
  return embedder;
}

export async function createEmbedding(text) {
  const model = await getEmbedder();

  const output = await model(text, {
    pooling: "mean",
    normalize: true,
  });

  //console.log("Embedding output:", output);

  return Array.from(output.data);
}

