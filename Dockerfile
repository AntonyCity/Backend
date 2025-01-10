FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN apt-get update && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/* && \
    npm install

COPY prisma ./prisma
RUN npx prisma --version
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
