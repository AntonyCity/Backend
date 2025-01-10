import prisma from '../prisma/prismaClient.js';

const getUsers = async () => {
    return await prisma.user.findMany();
};

const createUser = async (name, password, token, role) => {
    return await prisma.user.create({
        data: { name, password, token, role }
    });
};

export default { getUsers, createUser };
