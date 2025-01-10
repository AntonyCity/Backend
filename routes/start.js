import express from 'express';
import AuthController from '../controllers/authController.js';
import UserController from '../controllers/userController.js';

const router = express.Router();

/* Base route */
router.get('/', (req, res) => {

    res.set('Content-Type', 'text/html');
    res.status(200);
    res.send('Welcome !');

});

/* Authentification route */
router.post('/login', AuthController.login);

/* User route */
router.get('/users', UserController.getUsers);
router.post('/users', UserController.createUser);

/* 404 */ 

router.use('*', (req, res) => {
    console.log('404');
    res.status(404).json({ error: 'Page not found' });
});

export default router;