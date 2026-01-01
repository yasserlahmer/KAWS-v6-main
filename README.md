# KAWS CAR - Location de Voiture

Site web professionnel de location de voitures au Maroc.

## 🚗 Fonctionnalités

- 🌍 Multi-langues (Français, Anglais, Arabe avec RTL)
- 🚙 Catalogue de 8 véhicules premium
- 📱 Réservation via WhatsApp avec détails complets
- 📧 Notifications email automatiques
- 💳 Interface responsive et moderne
- 🎨 Design professionnel avec Tailwind CSS

## 🛠️ Technologies

**Frontend:**
- React 18
- Tailwind CSS
- Shadcn UI Components
- React Router

**Backend:**
- FastAPI (Python)
- MongoDB
- Resend (Email service)

## 📦 Déploiement

Consultez [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) pour les instructions complètes de déploiement sur Vercel.

## 🔑 Variables d'Environnement

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://votre-projet.vercel.app
```

### Backend (.env)
```
MONGO_URL=mongodb+srv://...
DB_NAME=kawscar
RESEND_API_KEY=re_...
SENDER_EMAIL=onboarding@resend.dev
SUPPORT_EMAIL=support@kawslocation.com
CORS_ORIGINS=*
```

## 👨‍💻 Développement Local

### Frontend
```bash
cd frontend
yarn install
yarn start
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

## 📧 Contact

- Email: support@kawslocation.com
- Téléphone: +212666505795
- Instagram: [@kaws_car_rentals](https://www.instagram.com/kaws_car_rentals)

## 🎨 Design

Designed by **YVSSΣR**

## 📄 Licence

© 2025 KAWS CAR. Tous droits réservés.
