import cvService from '../services/cvService.js';

class CvController {
    async upload(req, res) {
        try {
            const data = req.body.pdfText;

            const result = await cvService.processAndStoreCV(data);

            if (result.error) {
                res.status(500).json({ status: 'error', error: result.error });
                return;
            }

            res.status(200).json({ status: result });
        } catch (e) {
            res.status(500).json({ status: 'unexpected error: ' + e });
        }
    }
}

export default new CvController();
