import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function randomId() {
    let possibleUsers = await prisma.user.findMany({
        where: {
            role: "ADMIN"
        },
        select: {
            id: true, 
        },
    });
    
    if (possibleUsers.length === 0) {
        throw new Error("No users with ADMIN role found");
    }
    const randomIndex = Math.floor(Math.random() * possibleUsers.length);
    return possibleUsers[randomIndex].id;
};

function randomDate() {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    return new Date(oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime()));
};

async function main() {
    const jobsData = [];

    for (let i = 1; i <= 6; i++) {
        const userId = await randomId(); // Get a random ADMIN user ID
        const published = randomDate(); // Get a random date
        jobsData.push({
            filled: i % 2 === 0, // Alternate between filled true/false
            title: `Job number ${i}`,
            content: "This response code means the returned metadata is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy. This is mostly used for mirrors or backups of another resource. Except for that specific case, the 200 OK response is preferred to this status.",
            published,
            userId,
        });
    }

    await prisma.offer.createMany({
        data: jobsData,
        skipDuplicates: true,
    });
}

main().then(() => {
    console.log("Jobs created successfully");
}).catch((e) => {
    console.error("Error creating jobs", e);
})
