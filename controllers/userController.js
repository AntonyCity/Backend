import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/bcrypt.js';
// import { genPw } from '../utils/generatePW.js';

const prisma = new PrismaClient();

class UserController {

    async create (req, res) {
        try {

            let token = req.headers.authorization.split(' ')[1];
            let name = req.body.name;
            let role = req.body.role;

            let isAdmin  = await prisma.user.findUnique({
                where: {
                    token: token
                },
            });
            delete isAdmin.password && delete isAdmin.token && delete isAdmin.name ;
            if (isAdmin.role != "SUPER_ADMIN") {
                res.status(403).json({ error: "You don't have the level to do this operation or must be connected." });
                return;
            };

            let alredyExiste = await prisma.user.findUnique({
                where: {
                  name: name,
                }
            });

            if (alredyExiste != null) {
                res.status(403).json({ status: 'Alredy existe'});
                return;
            };

            let clearPW = await genPw();
            let password = await hashPassword(clearPW);

            await prisma.user.create({
                data: {
                    name: name,
                    password: password,
                    role: role
                }
            });

            res.status(200).json({ status: clearPW});
            return;

        } catch (e) {
            res.status(500).json({ status: 'unxpected error : ' + e});
            return;
        }
    };

    async show (req, res) {
        try {

            let token = req.headers.authorization.split(' ')[1];

            let user  = await prisma.user.findUnique({
                where: {
                    token: token
                },
            });
            delete user.password && delete user.token && delete user.name ;
            if (user.role != "SUPER_ADMIN") {
                res.status(403).json({ error: "You don't have the level to do this operation or must be connected." });
                return;
            };

            let allUser = await prisma.user.findMany({
                select: {
                    id: false,
                    name: true,
                    password: false,
                    token: false,
                    role: true,
                    offers: true
                }
            });

            res.status(200).json({allUser});
            return;

        } catch (e) {
            res.status(500).json({ status: 'unxpected error : ' + e});
            return;
        }
    };

    async update (req, res) {
        try {

           //todo 

        } catch (e) {
            res.status(500).json({ status: 'unxpected error : ' + e});
            return;
        }
    };

    async delete (req, res) {
        try {

            //todo

        } catch (e) {
            res.status(500).json({ status: 'unxpected error : ' + e});
            return;
        }
    };
};

export default new UserController();