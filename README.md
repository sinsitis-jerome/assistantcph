# Mon Assistant CPH — version à héberger sur GitHub Pages

Ce dossier contient une version autonome et installable (PWA) de l'application, distincte de la version publiée en Artifact. Elle est prête à être déposée telle quelle sur GitHub Pages pour être partagée avec vos testeurs via un simple lien.

## Contenu

- `index.html` — l'application complète (aucune dépendance à un serveur : toutes les données restent dans le navigateur de chaque utilisateur).
- `manifest.json` — permet au navigateur de proposer « Ajouter à l'écran d'accueil ».
- `sw.js` — service worker minimal (installabilité + ouverture hors-ligne basique).
- `icons/` — icônes de l'application (192px, 512px, versions « maskable » pour Android, icône Apple).
- `.nojekyll` — empêche GitHub Pages d'essayer de traiter le site avec Jekyll (inutile ici, mais évite un piège classique).

## Mise en ligne (une seule fois)

1. Créez un nouveau dépôt GitHub (public ou privé selon vos testeurs — un dépôt privé fonctionne aussi avec GitHub Pages sur un compte payant ; sur un compte gratuit, préférez un dépôt public si vous voulez que les testeurs y accèdent sans y être invités).
2. Déposez tout le contenu de ce dossier (`index.html`, `manifest.json`, `sw.js`, `icons/`, `.nojekyll`) à la racine du dépôt (ou dans un dossier `docs/` — au choix, à condition de le indiquer à l'étape suivante).
3. Dans le dépôt GitHub : **Settings → Pages**, choisissez la branche et le dossier où se trouvent ces fichiers, puis enregistrez.
4. GitHub fournit une adresse du type `https://votre-compte.github.io/nom-du-depot/` — c'est ce lien qu'il faut transmettre aux testeurs. GitHub Pages sert le site en HTTPS automatiquement, ce qui est indispensable pour que l'installation sur l'écran d'accueil fonctionne.

## Ce que verront les testeurs

- Sur Android/Chrome/Edge : après un court instant, un bandeau bleu apparaît sur l'écran d'accueil de l'application proposant « Installer ». Un bouton « Installer sur l'écran d'accueil » reste aussi disponible en permanence dans Réglages.
- Sur iPhone/iPad (Safari) : le même bandeau s'affiche, mais l'installation ne peut pas être déclenchée automatiquement (limitation d'Apple) — un appui dessus affiche les instructions manuelles (Partager → Sur l'écran d'accueil).
- Une fois installée, l'application s'ouvre en plein écran, sans barre d'adresse, comme une application native.

## Mettre à jour l'application plus tard

Quand vous redéposerez une nouvelle version de `index.html` (ou d'un autre fichier) sur GitHub :

1. Ouvrez `sw.js` et incrémentez `CACHE_NAME` (par exemple `cph-toolbox-v1` → `cph-toolbox-v2`). C'est ce qui force les appareils des testeurs à récupérer la nouvelle version au lieu de rester sur une copie mise en cache.
2. Republiez les fichiers modifiés sur GitHub. Les testeurs recevront la mise à jour à leur prochaine ouverture de l'application (avec connexion internet).

## À propos de la version Artifact

La version publiée en Artifact (le lien `claude.ai/code/artifact/...`) reste la version de travail/démonstration rapide — elle n'inclut pas le manifest ni le service worker, donc aucune proposition d'installation n'y apparaît. Les deux versions partagent le même code applicatif ; seule cette version GitHub est pensée pour une vraie diffusion à des testeurs avec installation sur l'écran d'accueil.
