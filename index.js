// ========================================================================================================
// Import the required modules
import * as dotenv from 'dotenv';
import express from 'express'; 
import cors from 'cors'; 
import router from "./routes/start.js"; // the routes 
import { verifyJwtToken } from './middelwares/middelware.js';
import { OpenAI } from 'openai'; 

// ========================================================================================================
// load the environment variables
dotenv.config();
const openai = new OpenAI(process.env.OPENAI_API_KEY);


// ========================================================================================================
// create the express app
const app = express();
const port = 8003;

app.use(cors());
app.use(express.json());

app.use('/offre', verifyJwtToken);
app.use('/user', verifyJwtToken);
app.use("/", router);

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
    console.log('http://localhost:8003/')
});

/*
TODO :
DONE - SetUp quick purge db  
- SetUp road to upload PDF
- SetUp Finish User controller
- SetUp gpt 
prompt : 'You are the head of human resources at one of the top 10 companies of the world. You have 40 years of experience and are an expert at analyzing and hiring candidate. You do the work mechanically and always answer in a JSON output way, you MUST FOLLOW THIS PATERN `{
    "fullname": "",
    "summary": "",
    "phone": "",
    "email": "" 
}`. If can can't find an information jsut put "N/A" in it.'
- Create function to send CV to gpt
- treat result and insert in db
*/