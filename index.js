// ========================================================================================================
// Import the required modules
import * as dotenv from 'dotenv';
import express from 'express'; 
import cors from 'cors'; 
import router from "./routes/start.js"; // the routes 
import { OpenAI } from 'openai'; 

// ========================================================================================================
// load the environment variables
dotenv.config();
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const port = process.env.PORT || 8003;


// ========================================================================================================
// create the express app
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
    console.log(`http://localhost:${port}`);
});