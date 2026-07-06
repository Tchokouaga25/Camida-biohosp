# Camida Biohosp

Site vitrine statique (HTML/CSS) pour **Camida Biohosp**, une marque présentée autour de produits agroalimentaires biologiques (« Pour une alimentation saine et 100% bio »). Projet réalisé dans le cadre de ma formation en développement web.

> ⚠️ Le code du site se trouve sur la branche **`master`** du dépôt. La branche `main`, quant à elle, contient par erreur un **commit accidentel de tout un dossier `Desktop/`** local (comprenant d'autres projets sans rapport, comme une seconde copie du brief `todo-api`/`todo-client`). Il est fortement recommandé de :
> - définir `master` comme branche par défaut sur GitHub (ou de fusionner son contenu dans `main`),
> - puis de supprimer ou nettoyer le contenu erroné de `main` pour éviter toute confusion pour les futurs contributeurs.

## 🎯 Aperçu du projet

Le site présente :
- une bannière d'en-tête avec message défilant (`<marquee>`) et icônes de réseaux sociaux,
- une section d'accroche « Camida Biohosp »,
- une section « Annonce » (promotions),
- une section « Produit » avec une grille de produits (image + description),
- une navigation vers plusieurs pages : Accueil, About, Produit, Contact, Formation (« Bondepart »).

## 📁 Structure du projet

```
Camida-biohosp/
├── Html/
│   ├── Accueil.html          # Page d'accueil (seule page actuellement complète)
│   ├── About.html            # Vide — à compléter
│   ├── Produit.html          # Vide — à compléter
│   ├── Contact.html          # Vide — à compléter
│   └── Bondepart.html        # Vide — à compléter
├── CSS/
│   └── Style.css             # Feuille de style principale du site
├── images/                   # Illustrations, produits, logo
└── *.png                     # Captures d'écran (procédure Git)
```

## ⚠️ État d'avancement

À ce stade, **seule la page `Accueil.html` est développée** (structure, contenu et styles). Les pages `About.html`, `Produit.html`, `Contact.html` et `Bondepart.html` existent mais sont **vides** ; les liens de navigation présents sur la page d'accueil pointent vers elles sans qu'elles aient de contenu pour l'instant.

Le contenu textuel actuel de la page d'accueil utilise encore du texte de remplissage (*Lorem ipsum*) à remplacer par le contenu définitif de la marque.

## 🛠️ Technologies utilisées

- HTML5
- CSS3 (mise en page, typographie via Google Fonts « Poppins »)
- Font Awesome (icônes, via CDN)

## 🚀 Utilisation

1. Cloner le dépôt puis se placer sur la branche `master` :
   ```bash
   git clone https://github.com/Tchokouaga25/Camida-biohosp.git
   cd Camida-biohosp
   git checkout master
   ```
2. Ouvrir `Html/Accueil.html` directement dans un navigateur (aucune installation ni serveur nécessaire, site 100% statique).

## 📌 Prochaines étapes suggérées

1. Nettoyer la branche `main` (retirer le commit accidentel du dossier `Desktop/`) et harmoniser les branches.
2. Compléter les pages `About.html`, `Produit.html`, `Contact.html` et `Bondepart.html`.
3. Remplacer les textes *Lorem ipsum* par le contenu définitif.
4. Ajouter un fichier `.gitignore` si des fichiers systèmes/temporaires venaient à être suivis par erreur (cf. l'incident sur `main`).
5. Envisager de rendre le site responsive s'il ne l'est pas déjà entièrement (à vérifier sur mobile).

## ✍️ Auteur

Projet réalisé par **Tchokouaga25** dans le cadre de la formation développement web à Inch.Class.
