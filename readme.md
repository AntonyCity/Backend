# Backend

# SetUp

`git clone git@github.com:AntonyCity/Backend.git`

Crée et remplir un .env baser sur le .env.example, pour le moment seul DATABASE_URL, JWT_SECRET, SALT_ROUNDS et FIXTURE_PW sont utiles.

Crée la base de donnée mysql (avoir un laragon ou mamp qui tourne). 

Dans un cmd run `npm install` pour récupérer tout les librairies.

`npx prisma migrate dev` pour run toute les migrations.

`npm run uf` pour crée les fixture utilisateur, puis `npm run dev` pour start le serveur express.


