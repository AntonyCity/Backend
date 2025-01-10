import jsonwebtoken from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
// ========================================================================================================
// generate a token for the user using the name and the secret token
async function generateJwtToken(payload) {

    const secret = process.env.JWT_SECRET;
    const token = jsonwebtoken.sign({name: payload}, secret);

    return token;
};

export { generateJwtToken };