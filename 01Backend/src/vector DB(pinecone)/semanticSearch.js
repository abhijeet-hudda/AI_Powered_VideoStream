import { videoIndex } from "./pincone.js";

export async function upsertVideoVector(id, embedding, metadata = {}) {
  if (!id) throw new Error("Missing id");

  if (!Array.isArray(embedding) || embedding.length !== 384) {
    throw new Error("Invalid embedding");
  }

  await videoIndex.upsert({
    records: [
      {
        id: id.toString(),
        values: embedding,
        metadata,
      },
    ],
  });
}


export async function semanticSearch(vector, topK = 10) {
  const result = await videoIndex.query({
    vector,
    topK,
    includeMetadata: true,
  });

  return result.matches;
}
