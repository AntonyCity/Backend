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
app.use("/", router);

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
    console.log('http://localhost:8003/')
});