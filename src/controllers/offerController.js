import offerService from '../services/offerService.js';
import pineconeController from '../embedding/pineconeVector.js';


class OfferController {
    async create(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const { title, content } = req.body;

            const result = await offerService.createOffer({ token, title, content });

            if (result.error) {
                res.status(result.status).json({ error: result.error });
                return;
            }

            res.status(200).json({ status: 'success' });
        } catch (e) {
            res.status(500).json({ status: 'unexpected error: ' + e });
        }
    }

    async reads(req, res) {
        try {
            const offers = await offerService.getAllOffers();
            res.status(200).json({ offers });
        } catch (e) {
            res.status(500).json({ status: 'unexpected error: ' + e });
        }
    }

    async update(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const { id, filled, title, content } = req.body;

            const name = await offerService.getName({token, id})
            await pineconeController.deleteToIndex(name, "offer");

            const result = await offerService.updateOffer({ token, id, filled, title, content });

            if (result.error) {
                res.status(result.status).json({ error: result.error });
                return;
            }

            

            res.status(200).json({ status: 'success', updatedOffer: result.updatedOffer });
        } catch (e) {
            res.status(500).json({ status: 'unexpected error: ' + e });
        }
    }

    async delete(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const { id } = req.body;

            const name = await offerService.getName({token, id})

            await pineconeController.deleteToIndex(name, "offer");

            const result = await offerService.deleteOffer({ token, id });

            if (result.error) {
                res.status(result.status).json({ error: result.error });
                return;
            }

            res.status(200).json({ status: 'success' });
        } catch (e) {
            res.status(500).json({ status: 'unexpected error: ' + e });
        }
    }

    
}

export default new OfferController();
