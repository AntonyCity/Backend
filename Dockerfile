FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN apt-get update && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/* && \
    npm install

COPY prisma ./prisma
RUN npx prisma --version
RUN npx prisma generate

ENV NODE_ENV=production

COPY . .

EXPOSE 3000

CMD ["npx", "nodemon", "-L", "src/index.js"]
