# Mettre l'application en ligne depuis l'iPhone (GitHub Pages)

Tout se fait sur l'iPhone, sans ordinateur. Prévoyez 15 minutes.

Tous les fichiers sont au même niveau, sans sous-dossier, pour pouvoir les envoyer d'un coup depuis le téléphone.

## Avant de commencer

- Un compte GitHub gratuit (github.com, bouton « Sign up »).
- Le fichier `nouvelle-ferme-pwa-iphone.zip` enregistré dans l'app **Fichiers**.
- Safari. Utilisez le site github.com dans Safari plutôt que l'app GitHub : à ma connaissance, l'app ne permet pas d'envoyer plusieurs fichiers d'un coup.

Astuce : si un menu GitHub semble absent, touchez **aA** dans la barre d'adresse de Safari, puis **Demander le site pour ordinateur**.

## Étape 1 : dézipper

Dans **Fichiers**, touchez le zip. Un dossier `nouvelle-ferme-pwa-iphone` apparaît avec 9 fichiers :
`index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png` et ce guide.

## Étape 2 : créer le dépôt

1. Dans Safari, ouvrez github.com et connectez-vous.
2. Touchez **+** puis **New repository**.
3. **Repository name** : `ferme-pro` (ou un autre nom court, sans espace).
4. Choisissez **Public**. Les pages gratuites de GitHub l'exigent. Le dépôt contient uniquement le code de l'application, jamais vos données.
5. Touchez **Create repository**.

## Étape 3 : envoyer les fichiers

1. Sur la page du dépôt vide, touchez le lien **uploading an existing file** (ou **Add file**, puis **Upload files**).
2. Touchez **choose your files**, puis **Parcourir** et ouvrez le dossier dézippé.
3. Sélectionnez **tous les fichiers** (touchez **Sélectionner**, puis **Tout sélectionner**), puis **Ouvrir**.
4. Attendez que la liste de 9 fichiers s'affiche, puis touchez **Commit changes**.

## Étape 4 : activer la publication

1. Dans le dépôt, onglet **Settings**, puis **Pages** dans la liste de gauche.
2. Sous **Build and deployment**, **Source** : choisissez **Deploy from a branch**.
3. **Branch** : `main`, dossier `/ (root)`, puis **Save**.
4. Attendez 1 à 2 minutes, puis rechargez la page. L'adresse s'affiche en haut :
   `https://VOTRE-NOM.github.io/ferme-pro/`
5. Touchez-la pour vérifier que l'application s'ouvre.

## Étape 5 : installer sur l'écran d'accueil

1. Ouvrez l'adresse dans **Safari**.
2. Touchez **Partager** (carré avec une flèche), puis **Sur l'écran d'accueil**, puis **Ajouter**.
3. Ouvrez l'application depuis l'icône du lapin, jamais depuis Safari.

Important : l'application installée et Safari ne partagent pas leurs données. Installez d'abord, puis saisissez vos données depuis l'icône.

## Étape 6 : vérifier le mode hors ligne

1. Ouvrez l'application **avec Internet** et laissez-la charger quelques secondes. Elle télécharge alors les polices et l'outil de PDF.
2. Fermez-la complètement, activez le **mode avion**, rouvrez-la. Saisissez une pesée pour tester.
3. Pour tester les PDF hors ligne, générez-en un une première fois en ligne.

## Reprendre les données de la version de test

1. Dans la version de test : engrenage, **Exporter une sauvegarde**, puis enregistrez dans Fichiers.
2. Dans l'application installée : engrenage, **Restaurer un fichier**, puis choisissez la sauvegarde.

Cette méthode sert aussi à changer de téléphone ou à copier les données sur un deuxième appareil.

## Protéger vos données

Les données sont dans la mémoire de l'application sur l'iPhone. Elles sont perdues si vous supprimez l'icône, si vous effacez les données des sites dans Réglages, Safari, ou si le téléphone est perdu ou réinitialisé.

Faites **une sauvegarde par semaine** (engrenage, Exporter une sauvegarde) et copiez-la dans un endroit sûr (messagerie, ordinateur, clé).

## Mettre à jour l'application

1. Sur GitHub, dans le dépôt, **Add file**, **Upload files**, et envoyez les nouveaux fichiers. Ceux qui ont le même nom remplacent les anciens.
2. Ouvrez `sw.js`, touchez l'icône crayon, changez le numéro à la ligne `VERSION` (par exemple `nfcp-v3` devient `nfcp-v4`), puis **Commit changes**.
3. Attendez 1 à 2 minutes. Sur l'iPhone, ouvrez l'application avec Internet, fermez-la complètement, puis rouvrez-la. Vos données ne sont pas touchées.

## Limites connues

- Pas de synchronisation automatique entre plusieurs téléphones.
- Pas de comptes ni de droits par utilisateur : toute personne qui ouvre l'application sur un téléphone voit les données de ce téléphone.
- Pas d'App Store.
- iPhone récent recommandé (iOS 16.4 ou plus).
- Les prix, tranches, délais et rendement par défaut sont des exemples : remplacez-les dans l'engrenage, Paramètres.

## En cas de problème

| Symptôme | Que faire |
|---|---|
| Page « 404 » à l'adresse GitHub | Attendez 2 minutes, vérifiez que `index.html` est bien à la racine du dépôt et que Pages est réglé sur `main` |
| « Sur l'écran d'accueil » n'apparaît pas | Ouvrez l'adresse dans Safari, pas dans une autre application |
| Page vide hors ligne | Rouvrez l'application une fois avec Internet, puis refaites le test |
| Les PDF ne se créent pas | Ouvrez l'application une fois avec Internet pour charger l'outil de PDF |
| Anciennes données absentes | Vous ouvrez Safari au lieu de l'icône : les deux sont séparés. Restaurez une sauvegarde |
| Une modification n'apparaît pas | Changez `VERSION` dans `sw.js`, puis rouvrez l'application avec Internet |
