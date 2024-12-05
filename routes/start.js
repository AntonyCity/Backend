import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();

/* Base route */
router.get('/', (req, res) => {

    res.set('Content-Type', 'text/html');
    res.status(200);
    res.send('Welcome !');

});

/* Authentification route */
router.post('/login', AuthController.login);

/* 404 */ 

router.use('*', (req, res) => {
    console.log('404');
    res.status(404).json({ error: 'Page not found' });
});

export default router;