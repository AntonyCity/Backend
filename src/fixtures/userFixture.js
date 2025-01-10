import userService from '../services/userService.js';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
    try {
        const result = await userService.createDefaultUsers(process.env.FIXTURE_PW);
        console.log(result.status);
    } catch (error) {
        console.error(error.message);
    }
}

main();
