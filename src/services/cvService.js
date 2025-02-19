import prisma from '../../prisma/prismaClient.js';
import { newMessage } from '../llm/openaiApi.js';
import pineconeController from '../embedding/pineconeVector.js'

class CvService {
    async processAndStoreCV(data) {
        console.log('Processing CV')
        try {
            
            const sysPrompt = `
                You are the head of human resources at one of the top 10 companies of the world. 
                You have 40 years of experience and are an expert at analyzing and hiring candidates. 
                I will give you text scrapped from the candidate CV. 
                You do the work mechanically and always answer in a JSON output way, 
                you MUST FOLLOW THIS PATTERN { "fullname": "", "summary": "", "tags": "", "phone": "", "email": "" }. 
                If you cannot find an information just put "N/A" in it.
            `;

            const response = await newMessage(sysPrompt, data);
            const result = JSON.parse(response.choices[0].message.content.slice(7, -3));

            const uniId = result.fullname
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, '') + new Date().toISOString();

            await prisma.candidate.create({
                data: {
                    uniId: uniId,
                    name: result.fullname,
                    summary: result.summary,
                    tags: result.tags,
                    phone: result.phone,
                    email: result.email,
                },
            });

            await pineconeController.addToIndex(uniId, result, 'cv');

            return result;
        } catch (e) {
            return { error: e.message };
        }
    }

    async getAllCv() {
        try {
            let temp = await prisma.candidate.findMany({
                select: {
                    name: true,
                    summary: true,
                    cvfile: true,
                    phone: true,
                    tags: true,
                    email: true,
                    cvPath: true
                  },
            });
             
            return temp
        } catch (e) {
            return { error: e.message };
        }
    }

    async fewCv(int) {
        try {
            console.log('trying')
            let temp = await prisma.candidate.findMany({
                select: {
                    name: true,
                    summary: true,
                    cvfile: true,
                    phone: true,
                    tags: true,
                    email: true,
                    cvPath: true
                  },
            });
            console.table(typeof temp)
            
            if (temp.length() > int) {
                console.log(1)
                return temp.slice(0, int);
            } else {
                console.log(2)
                return temp
            }
            
        } catch (e) {
            return { error: e.message };
        }
    }
}

export default new CvService();
