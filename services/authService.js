import prisma from '../prisma/prismaClient.js';
import { comparePassword } from '../utils/bcrypt.js';
import { generateJwtToken } from '../utils/jwt.js';

class AuthService {
    async loginUser({ name, password }) {
        try {
            const user = await prisma.user.findUnique({
                where: { name },
            });

            if (!user) {
                return { error: 'User does not exist', status: 404 };
            }

            const isCorrect = await comparePassword(password, user.password);

            if (!isCorrect) {
                return { error: 'Incorrect password', status: 403 };
            }

            const token = await generateJwtToken(name);

            await prisma.user.update({
                where: { name },
                data: { token },
            });

            return { name: user.name, role: user.role, token };
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

export default new AuthService();
