import { hashPassword } from '../utils/bcrypt.js';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const pw = await hashPassword(process.env.FIXTURE_PW);
const prisma = new PrismaClient();

await prisma.user.createMany({
    data: [
       { name: "Anna", password: pw, role: "SUPER_ADMIN" },
       { name: "Tom", password: pw, role: "ADMIN" },
       { name: "Bob", password: pw, role: "ADMIN" },
       { name: "Lucie", password: pw, role: "CLASSIC" },
       { name: "John", password: pw, role: "CLASSIC" },
       { name: "Rob", password: pw, role: "CLASSIC" },
       { name: "Leila", password: pw, role: "CLASSIC" },
    ],
    skipDuplicates: true, 
});