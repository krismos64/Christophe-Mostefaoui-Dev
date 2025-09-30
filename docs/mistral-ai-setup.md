# 🤖 Guide Configuration Chatbot Mistral AI (100% Gratuit)

## 🚀 Obtenir votre Clé API Mistral GRATUITE (2 minutes)

### Étape 1 : Créer un compte Mistral

1. Allez sur **[console.mistral.ai](https://console.mistral.ai)**
2. Cliquez sur **"Sign up"**
3. Inscrivez-vous avec votre email professionnel
4. Confirmez votre email

### Étape 2 : Générer votre clé API

1. Une fois connecté, allez dans **"API Keys"** (menu gauche)
2. Cliquez sur **"Create new key"**
3. Donnez un nom : `Chatbot Site Christophe`
4. **COPIEZ LA CLÉ** (elle ne sera plus visible après !)

### Étape 3 : Ajouter la clé dans le code

1. Ouvrez le fichier : `src/components/AIChatbot.tsx`
2. Ligne 162, remplacez :
```typescript
const MISTRAL_API_KEY = 'VOTRE_CLE_API_MISTRAL_ICI';
```
Par :
```typescript
const MISTRAL_API_KEY = 'votre-vraie-clé-api-ici';
```

### Étape 4 : Tester

```bash
npm run dev
```

Le chatbot apparaîtra en bas à droite de votre site !

---

## ✅ Ce qui est déjà configuré

### 📝 Contexte complet de Christophe
Le bot connaît TOUT sur vous :
- Vos services (dev web, SaaS, e-commerce)
- Vos technologies (React, Node.js, TypeScript)
- Vos projets (Staka, SmartPlanning)
- Vos tarifs (TJM 450€, site 2500€+)
- Votre localisation (Pau)

### 🎨 Design moderne
- Interface style ChatGPT/Claude
- Animation de frappe
- Bulle de bienvenue après 3 secondes
- Responsive et élégant

### 🔒 Restrictions intelligentes
Le bot :
- ✅ Répond UNIQUEMENT sur vos services
- ✅ Redirige vers votre email pour les devis
- ❌ Refuse poliment les questions hors-sujet
- ❌ Ne donne pas d'infos personnelles

---

## 💰 Coûts Mistral AI

### Plan GRATUIT inclus :
- ✅ **2€ de crédit offerts** à l'inscription
- ✅ Modèle `open-mistral-7b` : **0.25€ / million de tokens**
- ✅ Environ **8000 conversations** gratuites !

### Calcul :
- 1 conversation = ~500 tokens (question + réponse)
- 2€ / 0.00025€ = 8000 conversations
- **Largement suffisant pour des mois d'utilisation !**

---

## 🛠 Personnalisations possibles

### Changer le message de bienvenue
Ligne 198 dans `AIChatbot.tsx` :
```typescript
content: 'Bonjour ! 👋 Je suis l\'assistant de Christophe...'
```

### Modifier le délai d'apparition
Ligne 177 (3000ms = 3 secondes) :
```typescript
}, 3000); // Changez ici
```

### Ajuster la température IA
Ligne 235 (0.7 = équilibré) :
```typescript
temperature: 0.7, // 0 = précis, 1 = créatif
```

---

## ⚠️ Sécurité

### Pour la production :

1. **NE PAS exposer la clé API** dans le code client !

2. Créez un fichier `.env` :
```env
VITE_MISTRAL_API_KEY=votre-clé-api
```

3. Modifiez `AIChatbot.tsx` :
```typescript
const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;
```

4. Ajoutez `.env` dans `.gitignore`

### Solution idéale (optionnelle) :
Créer une route API backend qui fait l'appel à Mistral pour cacher la clé.

---

## 🎯 Prochaines améliorations possibles

1. **Historique des conversations** : Sauvegarder dans localStorage
2. **Suggestions de questions** : Boutons avec questions fréquentes
3. **Mode sombre** : S'adapter au thème du site
4. **Analytics** : Tracker les questions les plus posées
5. **Multi-langue** : Français/Anglais

---

## 📞 Support

- Documentation Mistral : [docs.mistral.ai](https://docs.mistral.ai)
- Statut API : [status.mistral.ai](https://status.mistral.ai)
- Votre chatbot fonctionne ? Le contexte est dans `AIChatbot.tsx` ligne 21-115

---

**✨ Votre chatbot IA est prêt ! Il connaît tout de vos services et répond naturellement.**