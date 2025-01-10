import prisma from '../prisma/prismaClient.js';
import { addToIndex } from '../embedding/pineconeVector.js';

class OfferService {
    async createOffer({ token, title, content }) {
        try {
            const user = await prisma.user.findUnique({
                where: { token },
            });

            if (!user || user.role === "CLASSIC") {
                return { error: "You don't have the level to do this operation or must be connected.", status: 403 };
            }

            const data = {
                filled: false,
                title,
                content,
                published: new Date().toISOString(),
                userId: user.id,
            };

            await prisma.offer.create({ data });

            const uniId = data.title.normalize("NFD").replace(/[\u0300-\u036f]/g, '') + data.published;

            await addToIndex(uniId, data, 'offertocv');

            return { status: 'success' };
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async getAllOffers() {
        try {
            return await prisma.offer.findMany();
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async updateOffer({ token, id, filled, title, content }) {
        try {
            if (!id) {
                return { error: "Offer ID is required.", status: 400 };
            }

            const user = await prisma.user.findUnique({
                where: { token },
            });

            if (!user || user.role === "CLASSIC") {
                return { error: "You don't have the level to do this operation or must be connected.", status: 403 };
            }

            const dataToUpdate = { updatedAt: new Date() };
            if (filled !== undefined) dataToUpdate.filled = filled;
            if (title) dataToUpdate.title = title;
            if (content) dataToUpdate.content = content;

            const updatedOffer = await prisma.offer.update({
                where: { id },
                data: dataToUpdate,
            });

            return { updatedOffer };
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async deleteOffer({ token, id }) {
        try {
            if (!id) {
                return { error: "Offer ID is required.", status: 400 };
            }

            const user = await prisma.user.findUnique({
                where: { token },
            });

            if (!user || user.role === "CLASSIC") {
                return { error: "You don't have the level to do this operation or must be connected.", status: 403 };
            }

            await prisma.offer.delete({
                where: { id },
            });

            return { status: 'success' };
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async createRandomJobs() {
        try {
            // Suppression des offres existantes
            await prisma.offer.deleteMany({});

            // Générer des données de travail
            const jobsData = [];
            for (let i = 1; i <= 6; i++) {
                const userId = await this.getRandomAdminId(); // Obtenir un ID d'utilisateur ADMIN aléatoire
                const published = this.getRandomDate(); // Obtenir une date aléatoire
                jobsData.push({
                    filled: i % 2 === 0, // Alterner entre rempli true/false
                    title: `Job number ${i}`,
                    content:
                        "This response code means the returned metadata is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy. This is mostly used for mirrors or backups of another resource. Except for that specific case, the 200 OK response is preferred to this status.",
                    published,
                    userId,
                });
            }

            // Créer les offres
            await prisma.offer.createMany({
                data: jobsData,
                skipDuplicates: true,
            });

            return { status: "Jobs created successfully" };
        } catch (error) {
            throw new Error("Error creating jobs: " + error.message);
        }
    }

    async getRandomAdminId() {
        const possibleUsers = await prisma.user.findMany({
            where: {
                role: "ADMIN",
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
    }

    getRandomDate() {
        const now = new Date();
        const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        return new Date(oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime()));
    }
}

export default new OfferService();
