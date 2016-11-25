# iAdvice VDM

Ce repository contient ma réponse à l'énoncé du test à l'embauche d'iAdvize.

Ce repository contient :
- Un serveur utilisant ExpressJS et servant l'API demandée.
- Un script ```extract-vdm.js``` créé par moi-même dont l'utilitée est de récupérer les données demandées.

##Enoncé du test
iAdvize m'a demandé de réaliser ce test dans le langage de mon choix.
J'ai opté pour du JavaScript.

### Description du test
Ce test a pour but de mettre en oeuvre une application permettant 2 choses :
* Permettre à l’aide d’une ligne de commande, d’aller chercher les 200 derniers enregistrements du site “Vie de merde” et de les stocker. (Champs à récupérer: Contenu, Date et heure, et auteur)
* Permettre la lecture des enregistrements précedemment récupérés à l’aide d’une API REST au format JSON

### Eléments requis
* Vous devez utiliser un framework de votre choix **Utilisation de ExpressJS en JavaScript **
* Vous avez le choix dans la méthode ou le procédé de stockage **Stockage dans un fichier JSON **
* Vous devez utiliser GIT pour versionner vos fichiers
* Vous devez utiliser Composer pour gérer vos dépendances **Utilisation de NPM en JavaScript **
* Vous devez tester unitairement votre code
* Vous devez mettre à disposition votre code via Github
* Vous ne devez pas utiliser l’API du site “Vie de Merde” pour récuperer les informations
