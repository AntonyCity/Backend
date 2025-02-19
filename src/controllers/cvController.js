import cvService from '../services/cvService.js';

class CvController {
    async upload(req, res) {
        try {
            const data = req.body.pdfText;
            //console.log(data);
            const result = await cvService.processAndStoreCV(data);
            //console.log(result)
            if (result.error) {
                res.status(500).json({ status: 'error', error: result.error });
                return;
            }

            res.status(200).json({ status: result });
        } catch (e) {
            try {
                const data = req.body.pdfText;
                //console.log(data);
                const result = await cvService.processAndStoreCV(data);
                //console.log(result)
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

    async getAll(req, res){
        try {
            const results = await cvService.getAllCv();
            if (results.error) {
                res.status(results.status).json({ error: results.error });
                return;
            }

            res.status(200).json({ allCandidate: results });
        } catch (e) {
            res.status(500).json({ status: 'unexpected error: ' + e });
        }
    }

    async getSome(req, res){
        try {
            let int = req.body.int
            if (typeof int !== 'number' || !Number.isInteger(int)) {
                return res.status(400).json({ error: 'Invalid input: Expected an integer.' });
            }

            const results = await cvService.fewCv(int);

            if (results.error) {
                res.status(results.status).json({ error: results.error });
                return;
            }

            res.status(200).json({ Candidate: results });
        } catch (e) {
            res.status(500).json({ status: 'unexpected error: ' + e });
        }
    }
}

export default new CvController();
