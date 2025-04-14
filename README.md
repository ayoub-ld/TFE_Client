![logo](https://github.com/user-attachments/assets/89c695f4-4f30-4ad7-a65a-05c8e4e2649b)

# Fil : the next-gen social media platform

---


[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.1-38BDF8?logo=tailwind-css)](https://tailwindcss.com)

Plateforme sociale moderne inspirée des grands réseaux avec des fonctionnalités essentielles et une expérience utilisateur optimisée.

## ✨ Fonctionnalités

- 🔐 Authentification sociale avec Google
- ✍️ Création de posts en temps réel
- 👥 Gestion de profil utilisateur
- 🔍 Recherche avancée
- 📱 Design responsive
- 🛡️ Middleware de sécurité
- 📊 Métriques d'engagement
- 💬 Interactions sociales (likes, commentaires)

## 🛠 Architecture

```txt
.
├── src/
│   ├── @types/         # Définitions TypeScript
│   ├── app/            # Routes de l'application
│   ├── components/     # Composants React
│   ├── container/      # Layouts principaux
│   ├── lib/            # Utilitaires
│   └── middleware.ts   # Sécurité
└── public/             # Assets statiques
```

## 📦 Technologies
- Framework : Next.js 15
- Stylage : Tailwind CSS
- Auth : Auth.js (anciennement NextAuth.js)
- ORM : Prisma
- Base de données : PostgreSQL
- HTTP Client : Axios
- UI : shadcn + Hero Icons
