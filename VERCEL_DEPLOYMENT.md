# 🚀 Déploiement KAWS CAR sur Vercel

Ce guide vous explique comment déployer votre site KAWS CAR sur Vercel.

## 📋 Prérequis

1. **Compte Vercel** : Créez un compte gratuit sur [vercel.com](https://vercel.com)
2. **MongoDB Atlas** : Base de données cloud gratuite sur [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
3. **Clés API** :
   - Resend API Key (pour les emails)
   - MongoDB Atlas URI

## 🗄️ Configuration MongoDB Atlas (Gratuit)

1. Créez un compte sur MongoDB Atlas
2. Créez un cluster gratuit (M0)
3. Configuration de sécurité :
   - Network Access → Add IP Address → "Allow Access from Anywhere" (0.0.0.0/0)
   - Database Access → Add New Database User → Créez un utilisateur avec mot de passe
4. Obtenez votre URI de connexion :
   - Connect → Connect your application
   - Copiez l'URI : `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/kawscar?retryWrites=true&w=majority`

## 📦 Préparation du Projet

### 1. Construire le Frontend

```bash
cd /app/frontend
yarn build
```

### 2. Initialiser les Données MongoDB

Avant le déploiement, assurez-vous que vos 8 voitures sont dans MongoDB Atlas.
Utilisez le script `seed_database.py` avec votre URI MongoDB Atlas.

## 🌐 Déploiement sur Vercel

### Option A : Déploiement via GitHub (Recommandé)

1. **Push votre code sur GitHub** :
   ```bash
   cd /app
   git init
   git add .
   git commit -m "Ready for Vercel deployment"
   git branch -M main
   git remote add origin https://github.com/votre-username/kaws-car.git
   git push -u origin main
   ```

2. **Connecter à Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez "Add New Project"
   - Importez votre repository GitHub
   - Framework Preset: **Create React App**
   - Root Directory: `/`
   - Build Command: `cd frontend && yarn install && yarn build`
   - Output Directory: `frontend/build`

3. **Configurer les Variables d'Environnement** :
   Dans Vercel Dashboard → Settings → Environment Variables, ajoutez :

   ```
   # MongoDB
   MONGO_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   DB_NAME=kawscar
   
   # Email (Resend)
   RESEND_API_KEY=re_FeqAupD6_pPEsdf5D5raFDbE6cgAK3vF5
   SENDER_EMAIL=onboarding@resend.dev
   SUPPORT_EMAIL=support@kawslocation.com
   
   # CORS
   CORS_ORIGINS=*
   
   # Frontend
   REACT_APP_BACKEND_URL=https://votre-projet.vercel.app
   ```

### Option B : Déploiement via CLI Vercel

1. **Installer Vercel CLI** :
   ```bash
   npm install -g vercel
   ```

2. **Login** :
   ```bash
   vercel login
   ```

3. **Déployer** :
   ```bash
   cd /app
   vercel
   ```

4. Suivez les instructions et configurez les variables d'environnement

## 📝 Structure des Fichiers pour Vercel

```
/app
├── vercel.json                    # Configuration Vercel
├── frontend/
│   ├── build/                     # Build React (généré)
│   ├── package.json
│   └── ...
├── backend/
│   ├── api/
│   │   └── index.py              # Entry point serverless
│   ├── routes/
│   ├── models/
│   ├── services/
│   └── requirements-vercel.txt   # Dépendances Python pour Vercel
└── VERCEL_DEPLOYMENT.md          # Ce fichier
```

## 🔧 Configuration Post-Déploiement

### 1. Vérifier le Domaine Resend

Pour que les emails fonctionnent en production :
1. Allez sur [resend.com/domains](https://resend.com/domains)
2. Ajoutez votre domaine `kawslocation.com`
3. Configurez les DNS (TXT, MX records)
4. Changez `SENDER_EMAIL` en `support@kawslocation.com`

### 2. Tester l'API

Après déploiement, testez :
```bash
curl https://votre-projet.vercel.app/api/health
curl https://votre-projet.vercel.app/api/cars
```

### 3. Configurer le Domaine Personnalisé

1. Dans Vercel Dashboard → Settings → Domains
2. Ajoutez `kawslocation.com`
3. Suivez les instructions DNS

## ⚠️ Points Importants

1. **MongoDB Local vs Atlas** :
   - Le MongoDB local (`localhost:27017`) ne fonctionne PAS sur Vercel
   - Utilisez OBLIGATOIREMENT MongoDB Atlas (gratuit)

2. **Variables d'Environnement** :
   - Configurez TOUTES les variables dans Vercel Dashboard
   - Ne hardcodez JAMAIS les clés API dans le code

3. **Build Frontend** :
   - Le frontend doit être buildé avant déploiement
   - Vercel le fait automatiquement avec la config dans `vercel.json`

4. **API Routes** :
   - Toutes les routes backend sont préfixées par `/api`
   - Exemple : `https://votre-projet.vercel.app/api/cars`

## 🐛 Résolution des Problèmes

### Problème : "Module not found"
**Solution** : Vérifiez que `requirements-vercel.txt` contient toutes les dépendances

### Problème : "MongoDB connection failed"
**Solution** : 
- Vérifiez votre URI MongoDB Atlas
- Assurez-vous que l'IP 0.0.0.0/0 est autorisée dans Network Access

### Problème : "CORS error"
**Solution** : Ajoutez votre domaine Vercel dans `CORS_ORIGINS`

### Problème : "Email not sending"
**Solution** :
- Vérifiez `RESEND_API_KEY`
- En mode test, les emails vont uniquement vers votre email vérifié
- Vérifiez votre domaine sur Resend pour envoyer à `support@kawslocation.com`

## 📊 Surveillance

- **Logs** : Vercel Dashboard → Deployments → View Logs
- **Analytics** : Vercel Dashboard → Analytics
- **Erreurs** : Vérifiez les logs en temps réel

## 💰 Coûts

- **Vercel** : Gratuit (Hobby plan) - Limites : 100 GB bandwidth/mois
- **MongoDB Atlas** : Gratuit (M0) - 512 MB storage
- **Resend** : Gratuit - 3000 emails/mois

## 🎉 C'est Fait !

Votre site est maintenant en ligne sur Vercel ! 🚀

URL : `https://votre-projet.vercel.app`

Pour toute question, consultez :
- [Documentation Vercel](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Resend Docs](https://resend.com/docs)
