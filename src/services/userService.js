import prisma from '../../prisma/prismaClient.js';
import { hashPassword } from '../utils/bcrypt.js';
// import { genPw } from '../utils/generatePW.js';

class UserService {
    async createUser({ token, name, role }) {
        try {
            const isAdmin = await prisma.user.findUnique({
                where: { token },
            });

            if (!isAdmin || isAdmin.role !== "SUPER_ADMIN") {
                return { error: "You don't have the level to do this operation or must be connected.", status: 403 };
            }

            const alreadyExists = await prisma.user.findUnique({
                where: { name },
            });

            if (alreadyExists) {
                return { error: "Already exists", status: 403 };
            }

            const clearPW = await genPw(); // Ensure genPw is properly imported
            const password = await hashPassword(clearPW);

            await prisma.user.create({
                data: { name, password, role },
            });

            return { status: clearPW };
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async getAllUsers(token) {
        try {
            const user = await prisma.user.findUnique({
                where: { token },
            });

            if (!user || user.role !== "SUPER_ADMIN") {
                return { error: "You don't have the level to do this operation or must be connected.", status: 403 };
            }

            const allUsers = await prisma.user.findMany({
                select: {
                    name: true,
                    role: true,
                    offers: true,
                },
            });

            return { data: allUsers, status: 200 };
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async createDefaultUsers(password) {
        try {
            const hashedPassword = await hashPassword(password);

            const usersData = [
                { name: "Anna", password: hashedPassword, role: "SUPER_ADMIN" },
                { name: "Tom", password: hashedPassword, role: "ADMIN" },
                { name: "Bob", password: hashedPassword, role: "ADMIN" },
                { name: "Lucie", password: hashedPassword, role: "CLASSIC" },
                { name: "John", password: hashedPassword, role: "CLASSIC" },
                { name: "Rob", password: hashedPassword, role: "CLASSIC" },
                { name: "Leila", password: hashedPassword, role: "CLASSIC" },
            ];

            await prisma.user.createMany({
                data: usersData,
                skipDuplicates: true,
            });

            return { status: "Users created successfully" };
        } catch (error) {
            throw new Error("Error creating users: " + error.message);
        }
    }
}

export default new UserService();
