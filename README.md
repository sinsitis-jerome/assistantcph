# Boîte à outils CPH

Application web (PWA) à destination des conseillers prud'homaux : feuille de vacation avec relevé mensuel, guide pas-à-pas pour présider un BJ ou un BCO, textes de référence et phrases rituelles.

- Aucune dépendance externe hors polices Google Fonts (Fraunces, Inter, JetBrains Mono).
- Aucune donnée envoyée à un serveur : tout est stocké dans le navigateur (`localStorage`) sur l'appareil de chaque utilisateur. Sauvegarde/restauration possibles via export JSON (menu Réglages).
- Fonctionne hors connexion une fois ouverte une première fois (service worker avec repli sur le cache).
- Installable comme application sur téléphone/tablette (icônes et `manifest.json` inclus).

## Déployer sur GitHub Pages

1. Créez un dépôt GitHub (public ou privé — GitHub Pages fonctionne avec les deux si votre offre le permet).
2. Déposez le contenu de ce dossier **à la racine** du dépôt (pas dans un sous-dossier), en conservant la structure :
   ```
   index.html
   manifest.json
   service-worker.js
   .nojekyll
   icons/
     icon-192.png
     icon-512.png
     icon-180.png
     icon-maskable-192.png
     icon-maskable-512.png
   ```
   Le fichier `.nojekyll` est important : sans lui, GitHub Pages ignore certains fichiers (dossiers commençant par un point) et peut mal servir le site.
3. Sur GitHub : **Settings → Pages**, source = **Deploy from a branch**, branche `main` (ou celle utilisée), dossier `/ (root)`. Enregistrez.
4. Après une minute ou deux, le site est disponible à une adresse du type
   `https://VOTRE-COMPTE.github.io/NOM-DU-DEPOT/`.
5. Ouvrez cette adresse sur votre téléphone, puis « Ajouter à l'écran d'accueil » (Safari/Chrome) pour l'installer comme une application.

### Avec la ligne de commande

```bash
cd boite-a-outils-cph
git init
git add .
git commit -m "Première version de la boîte à outils CPH"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/NOM-DU-DEPOT.git
git push -u origin main
```

Puis activez GitHub Pages comme décrit à l'étape 3 ci-dessus.

## Mettre à jour le contenu

Tout le contenu (étapes du guide BJ/BCO, textes de référence, phrases rituelles, natures de vacation) est défini au début de la balise `<script>` dans `index.html`, sous forme de tableaux JavaScript lisibles (`BJ_STEPS`, `BCO_STEPS`, `REF_TEXTS`, `PHRASES`, `NATURES`). Pas de base de données ni de build : modifier ces tableaux puis republier le fichier suffit.

Le guide **« Présider un BCO »** est un brouillon provisoire, clairement signalé dans l'application — à remplacer dès qu'une trame fiable et sourcée est disponible.

## Vie privée

Les vacations saisies, la progression des guides et le profil (nom, CPH, section) restent uniquement sur l'appareil de chaque utilisateur. Rien n'est transmis à un serveur, à GitHub ou à un tiers par l'application elle-même.
