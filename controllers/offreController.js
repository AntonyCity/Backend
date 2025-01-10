import { PrismaClient } from '@prisma/client';
import { Pinecone } from '@pinecone-database/pinecone';
import { addToIndex } from '../embedding/pineconeVector.js';

const prisma = new PrismaClient();

class OffreController {

    async create (req, res) {
        try {
            let token = req.headers.authorization.split(' ')[1];
            let title = req.body.title;
            let content = req.body.content;

            let user  = await prisma.user.findUnique({
                where: {
                    token: token
                },
            });
            delete user.password && delete user.token && delete user.name ;
            if (user.id == null || user.role == "CLASSIC") {
                res.status(403).json({ error: "You don't have the level to do this operation or must be connected." });
                return;
            };

            let data = {
                filled: false,
                title: title,
                content: content,
                published: new Date.toISOString(),
                userId: user.id
            };

            await prisma.offer.create({
                data: data
            });

            let uniId = data.title.normalize("NFD").replace(/[\u0300-\u036f]/g, '') + data.published;

            await addToIndex(uniId, data, offertocv);

            res.status(200).json({ status: 'succed'})

        } catch (e) {
            res.status(500).json({ status: 'unxpected error : ' + e});
            return;
        }
    };

    async reads (req, res) {
        try {

            let offers = await prisma.offer.findMany();
            res.status(200).json({offers});
            return;

        } catch (e) {
            res.status(500).json({ status: 'unxpected error : ' + e});
            return;
        }
    };

    async update(req, res) {
        try {
            let token = req.headers.authorization.split(' ')[1];
            let offerId = req.body.id;
    
            if (!offerId) {
                res.status(400).json({ error: "Offer ID is required." });
                return;
            }
    
            let dataToUpdate = {};
            if (req.body.filled !== undefined) dataToUpdate.filled = req.body.filled; // Allow false values
            if (req.body.title) dataToUpdate.title = req.body.title;
            if (req.body.content) dataToUpdate.content = req.body.content;
            dataToUpdate.updatedAt = new Date;

            let user = await prisma.user.findUnique({
                where: { 
                    token: token 
                }
            });
            delete user.password && delete user.token && delete user.name ;
            if (!user || user.role === "CLASSIC") {
                res.status(403).json({ error: "You don't have the level to do this operation or must be connected." });
                return;
            };
    
            let updatedOffer = await prisma.offer.update({
                where: { 
                    id: offerId 
                },
                data: dataToUpdate
            });
    
            res.status(200).json({ status: 'success', updatedOffer });
            return;
        } catch (e) {
            res.status(500).json({ status: 'unexpected error: ' + e });
            return;
        };
    };
    

    async delete (req, res) {
        try {
            let token = req.headers.authorization.split(' ')[1];
            let offerId = req.body.id;
    
            if (!offerId) {
                res.status(400).json({ error: "Offer ID is required." });
                return;
            };

            let user = await prisma.user.findUnique({
                where: { 
                    token: token 
                }
            });
            delete user.password && delete user.token && delete user.name ;
            if (!user || user.role === "CLASSIC") {
                res.status(403).json({ error: "You don't have the level to do this operation or must be connected." });
                return;
            };

            await prisma.offer.delete({
                where: {
                  id: offerId,
                },
            });

            res.status(200).json({ status: 'success' });
            return;
        } catch (e) {
            res.status(500).json({ status: 'unxpected error : ' + e});
            return;
        }
    };

};

export default new OffreController();