import { PrismaClient } from '@prisma/client';
import { newMessage } from  '../llm/openaiApi.js';
import { addToIndex } from '../embedding/pineconeVector.js';


const prisma = new PrismaClient();

class CvController {
    
    
    async upload (req, res) {

        console.log('hey runy')
        //console.log(req.body.pdfText)

        let data = req.body.pdfText ;
        console.log(data)

        let sysPrompt = 'You are the head of human resources at one of the top 10 companies of the world. You have 40 years of experience and are an expert at analyzing and hiring candidate. I wil give you text scrapped from the candidate CV. You do the work mechanically and always answer in a JSON output way, you MUST FOLLOW THIS PATERN `{ "fullname": "", "summary": "", "tags": "", "phone": "", "email": "" }`. If can can not find an information just put "N/A" in it.';

        
        
        let result = await newMessage(sysPrompt, data)
        result = JSON.parse(result.choices[0].message.content.slice(7, -3));
        console.log(result)

        let uniId = result.fullname.normalize("NFD").replace(/[\u0300-\u036f]/g, '') + new Date().toISOString();

        await prisma.candidate.create({
            data: {
                uniId: uniId,
                name: result.fullname,
                summary: result.summary,
                tags: result.tags,
                phone: result.phone,
                email: result.email
            }
        });

        await addToIndex(uniId, result);

        res.status(200).json({message: 'File uploaded and treated successfully.'});
    };

};

export default new CvController();