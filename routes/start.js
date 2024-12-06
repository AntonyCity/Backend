import express from 'express';
import AuthController from '../controllers/authController.js';
import OffreController from '../controllers/offreController.js';

const router = express.Router();

/* Base route */
router.get('/', (req, res) => {

    res.set('Content-Type', 'text/html');
    res.status(200);
    res.send('Welcome !');

});

/* Authentification route */
router.post('/login', AuthController.login);

/* CRUD offres */
router.post('/offre/add', OffreController.create);
router.get('/offre/display', OffreController.reads);
router.put('/offre/update', OffreController.update);
router.delete('/offre/delete', OffreController.delete);

/* 404 */ 
router.use('*', (req, res) => {
    console.log('404');
    res.status(404).json({ error: 'Page not found' });
});

export default router;