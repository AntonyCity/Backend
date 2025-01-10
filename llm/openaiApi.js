import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function newMessage (input, data) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "developer", content: input,
          },
          {
            role: "user", content: data,
          },
        ],
        model: "gpt-4o-mini"
      });
      //console.log(completion.choices[0].message);
      return completion;
    } catch (err) {
      console.log("failed: " + err)
    } 
};

export { newMessage };