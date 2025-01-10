import offerService from '../services/offerService.js';

async function main() {
    try {
        const result = await offerService.createRandomJobs();
        console.log(result.status);
    } catch (error) {
        console.error(error.message);
    }
}

main();
