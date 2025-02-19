import express from 'express';
import AuthController from '../controllers/authController.js';
import OfferController from '../controllers/offerController.js';
import UserController from '../controllers/userController.js';
import cvController from '../controllers/cvController.js';
import upload from '../utils/multer.js';

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
router.get('/users', UserController.show);
router.post('/users', UserController.create);


/* CRUD offres */
router.post('/offre/add', OfferController.create);
router.get('/offre/display', OfferController.reads);
router.put('/offre/update', OfferController.update);
router.delete('/offre/delete', OfferController.delete);

/* CRUD user */
router.post('/user/add', UserController.create);
router.get('/user/display', UserController.show);
router.put('/user/update', UserController.update);
router.delete('/user/delete', UserController.delete);

/* Manage CV */
router.post('/cv/upload', cvController.upload);
router.get('/cv/show', cvController.getAll);
router.post('/cv/some', cvController.getSome)


router.use('/test', (req, res) => {
    console.log('test')
    console.log(req.body);
    res.status(403).json({ error: 'bumshit' });
})

/* 404 */ 
router.use('*', (req, res) => {
    console.log('404');
    res.status(404).json({ error: 'Page not found' });
});

export default router;