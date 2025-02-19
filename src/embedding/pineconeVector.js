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

class pineconeController {
    async addToIndex(id, data, inx) {
        const results = [];
        let formated = data;
        //console.log(typeof formated)
        //console.log(formated)
        try {
            const embedding = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: JSON.stringify(formated),
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
    
            //console.log("All embeddings:", results);
    
            const index = pc.Index(inx);
            await index.upsert(results);
    
            console.log("Data upserted successfully.");
        } catch (error) {
            console.error("Error while adding to index:", error);
        }
    }

    async deleteToIndex(id, inx) {
        try {
            const index = pc.Index(inx);
            await index.deleteOne(id);
            console.log("Data deleted successfully.");
        } catch (error) {
            console.error("Error while supressing to index:", error);
        }
    }
    
    async searchCvForOffer(summary, tags) { 
        const results = [];
        try {
            if (typeof summary !== "string") {
                summary = JSON.stringify(summary);
            }
            if (typeof tags !== "string") {
                tags = JSON.stringify(tags);
            }
            
            const formatted = `Summary: ${summary}. Tags: ${tags}`;
    
            const embeddingResponse = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: formatted,
                encoding_format: "float",
            });
    
            if (!embeddingResponse.data || !embeddingResponse.data[0] || !embeddingResponse.data[0].embedding) {
                throw new Error("Embedding data not found in the response.");
            }
    
            const vector = embeddingResponse.data[0].embedding;
    
    
            const index = pc.Index("offer"); 
    
            const queryResponse = await index.query({
                vector: vector,
                topK: 3, 
                includeMetadata: true, 
                namespace: "", 
            });
    
            if (queryResponse && queryResponse.matches) {
                return queryResponse.matches.map(match => ({
                    id: match.id,
                    score: match.score,
                    metadata: match.metadata,
                }));
            }
    
            return results;
    
        } catch (error) {
            console.error("Error while performing search:", error);
            return results;
        }
    }
}



export default new pineconeController();