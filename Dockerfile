FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN apt-get update && apt-get install -y openssl && npm install --omit=dev

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
