# Portfolio GitHub Pages — FR / DE

Ce projet est un portfolio statique prêt à être publié sur GitHub Pages. Il présente les trois sites vitrines construits sur Ubuntu ainsi que l'infrastructure de développement.

## Avant toute publication : personnalisation

Ouvrir `config.js` dans un éditeur (VS Code, Bloc-notes) et modifier :

```js
window.PORTFOLIO_CONFIG = {
  displayName: "Prénom NOM",                  // Facultatif
  email: "mon-adresse@gmail.com",              // À rendre publique uniquement si désiré
  githubUsername: "MON_IDENTIFIANT_GITHUB",    // Identifiant seul
  projectUrls: {
    ordinateurs: "",  // URL HTTPS publique seulement lorsque Funnel est activé
    velos: "",
    soutien: ""
  }
};
```

IMPORTANT : `config.js` devient **public** sur GitHub ; ne jamais y ajouter mots de passe, tokens, clés API, identifiants SMTP ou autres secrets.

Le site fonctionnera même si certains champs restent vides : les contacts manquants sont cachés, et les démonstrations privées apparaissent simplement comme « lien public à venir ».

## Tester le portfolio localement

Double-cliquer sur `index.html` dans l'explorateur Windows, ou avec Python :

```bash
cd portfolio-github
python3 -m http.server 8090
```

Puis ouvrir `http://localhost:8090`.

## Publier sur GitHub Pages (méthode navigateur — sans Git installé)

1. Se connecter à https://github.com/.
2. Créer un dépôt public, par exemple `portfolio` (sans activer « Add a README » si vous souhaitez partir d'un dépôt entièrement vide).
3. Dans le dépôt, sélectionner **Add file → Upload files** et déposer les **fichiers et dossiers à l'intérieur de `portfolio-github/`**, et NON le dossier `portfolio-github` lui-même. Vérifier que `index.html` apparaît à la racine.
4. Valider avec **Commit changes**.
5. Aller dans **Settings → Pages → Build and deployment → Source : Deploy from a branch → Branch : main → /(root) → Save**.
6. L'adresse devrait être `https://IDENTIFIANT.github.io/portfolio/` si le dépôt est nommé `portfolio`. Le déploiement peut prendre quelques minutes.

Si la rubrique « Add file → Upload files » gère mal les fichiers cachés, vous pouvez omettre `.nojekyll` : il n'est pas nécessaire pour les fichiers de ce portfolio.

### Mettre à jour les liens publics plus tard

Après vérification de l'accès Tailscale Funnel, modifier `config.js` depuis GitHub ou en local :

```js
projectUrls: {
  ordinateurs: "https://az-server.tail8f0b8d.ts.net/",
  velos: "https://az-server.tail8f0b8d.ts.net:8443/",
  soutien: "https://az-server.tail8f0b8d.ts.net:10000/"
}
```

Ces trois adresses restent **privées tant que Tailscale Serve est actif**. Ne les ajouter qu'une fois qu'elles sont accessibles **publiquement** (Funnel), que les formulaires sont sécurisés, et que vous souhaitez réellement publier des sites de prestations.

## Caractéristiques

- Interface français/allemand (bouton `DE` / `FR`)
- Mode sombre et clair
- Présentation responsive, clavier et sans bibliothèque externe
- Filtres des projets Web / Infrastructure
- Aucune dépendance npm ou backend : HTML/CSS/JavaScript uniquement
- Liens de démonstration désactivés par défaut pour les sites privés

## Fichiers

- `index.html` : structure de la page
- `styles.css` : design responsive
- `script.js` : interactions et traductions
- `config.js` : liens et coordonnées publiques à personnaliser
- `assets/favicon.svg` : icône vectorielle
- `.nojekyll` : option pour la publication statique sur GitHub Pages

## Note

Ce portfolio présente des **projets techniques de démonstration**. La mise en ligne de services commerciaux est une étape différente ; ne pas proposer d'interventions rémunérées sans s'assurer des autorisations et obligations applicables.
