# 🚀 AntonyCity - Backend

**Description du projet.** 

---

## 🛠️ Technologies utilisées

- **Backend** : Node.js, Express
- **Base de données** : MySQL + Prisma ORM
- **Containerisation** : Docker

---

## 👥 Équipe

| Prénom | Nom | Rôle |
|--------|-----|------|
|--------|-----|------|
|--------|-----|------|
|--------|-----|------|

---

## 📥 Installation

### 1️⃣ Cloner le dépôt
```bash
git clone https://github.com/AntonyCity/Backend.git
cd Backend
```

### 2️⃣ Installer les dépendances
```bash
npm install
```

### 3️⃣ Configurer les variables d'environnement
```bash
cp .env.example .env
```

### 4️⃣ Lancer le projet 🚀
```bash
npm run dev
```

### 5️⃣ Donner les permissions à l'utilisateur MySQL 🛡️
```bash
docker exec -it {CONTAINER_NAME} bash
mysql -u{ROOT_USERNAME} -p{ROOT_PASSWORD}
GRANT ALL PRIVILEGES ON *.* TO '{USERNAME}@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
exit
```

### 6️⃣ Initialiser Prisma dans le container 🏗️
```bash
npm run prisma:generate
```

### 7️⃣ Créer les tables dans la base de données 🗄️
```bash
npm run prisma:init
```

---

## 📌 Migration de la base de données

Pour effectuer une migration, utilisez la commande suivante :
```bash
npm run prisma:migrate -- {MIGRATION_NAME}
```
