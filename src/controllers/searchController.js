import pineconeController from '../embedding/pineconeVector.js'

class searchController {
    async search(req, res) {
        try {
            const {summary, tags} = req.body;
    
            const result = await pineconeController.searchCvForOffer({summary, tags});
    
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

export default new searchController() ;

