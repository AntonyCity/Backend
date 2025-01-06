import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const pc = new Pinecone({

    apiKey: process.env.PINECONE_API_KEY,
    fetchApi: fetch

});

//text-embedding-3-small
//cosine
//1536

async function addToIndex(id, data) {
    const results = [];

    try {
        const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: JSON.stringify(data),
            encoding_format: "float",
        });

        if (!embedding.data || !embedding.data[0] || !embedding.data[0].embedding) {
            throw new Error("Embedding data not found in the response.");
        }

        results.push({
            id: id,
            values: embedding.data[0].embedding,
            metadata: {
                text: JSON.stringify(data),
            }
        });

        console.log("All embeddings:", results);

        const index = pc.Index('offertocv');
        await index.upsert(results);

        console.log("Data upserted successfully.");
    } catch (error) {
        console.error("Error while adding to index:", error);
    }
}


export { addToIndex };