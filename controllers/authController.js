import { comparePassword } from '../utils/bcrypt.js';
import { generateJwtToken } from '../utils/jwt.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
class AuthController {

    async login (req, res) {
        try {

            let name = req.body.name;
            let pw = req.body.password;

            let result = await prisma.user.findUnique({
                where: {
                  name: name,
                },
            });

            delete result.id;
            delete result.token;

            if (result == null) {
                res.status(404).json({ status: 'User dont existe'});
                return;
            };

            let isCorrect = await comparePassword (pw, result.password);

            if (isCorrect == false) {
                res.status(403).json({ status: 'Password incorect'});
                return;
            };

            delete result.password;

            let tokenGen = await generateJwtToken(name);

            await prisma.user.update({
                where: {
                    name: name,
                  },
                  data: {
                    token: tokenGen,
                  },
            });

            res.status(200).json({ name: result.name, role: result.role, token: tokenGen });
            return;

        } catch (e) {
            res.status(500).json({ status: 'unxpected error : ' + e});
            return;
        };
    };

};

export default new AuthController();