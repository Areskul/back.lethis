# Lethis back-end

# Intro

Le back est une API
C'est essentiellement une surcouche en Javascript/Typescript au dessus d'une base de donnée.
La surcouche JS/TS permet d'interagir plus facilement avec la base de donnée qui stock uniquement l'information..
Ainsi n'import qui peut demander de demander de l'information à cette application de la façon suivante.

# Requettes

Le language de requette est graphQL

Example:
Si l'aplication tourne sous le domaine "https://lethis.com/"
Vous pouvez utiliser des outils pour envoyer des requettes en http (postman, curl et autre)
Vous allez à cet url et interrogez la base de donnée de la façon qui suit

https://lethis.com/graphql

json request:

    user {
      id
      name
      email
    }

et celle ci vous retourne:

    user {
      1
      dupont
      jean.dupont@gmail.com
    }

# Stack technique

Basé sur node.js
Faire tourner l'application dans un environnement node.js

En mode locale pour le developpement avec
```sh
yarn start
```

Ou sur vos sereurs pour la production
```sh
yarn prod
```
voir package.json

## Graphql

Le systeme de requette est graphql/Apollo
https://www.apollographql.com/docs/apollo-server/testing/build-run-queries/

## ORM

Typegraph et TypeORM sont des surcouches en javascript
qui permettent d'intéragir avec la base de donnée 

Les fihiers de configuration afin de lier l'ORM a la base de donnée est ormconfig.json
## Git Branches

Il y a une version stable sur la branche "main",
Et celle en developpement avec les nouveaux features
est sur la branche "dev"
 

# Etat de l'application

Modèle de base de donnée au point et stable.

Les différentes entités à "./entitites" représentent une TABLE dans la base de donnée avec les différents type de valeurs qu'elle contient.

Ex: "./entities/client.ts" contient la définition type d'un client

Le code ci-dessous est à titre d'exemple. Voir le contenu du fichier pour la définition complète du client.
```json
Client: {
  pacsé: oui | non
  sexe: M | F
}
```

Authentification d'utilisateur: checked

Sauvegarde des données clients: checked

Roles:
  Admin/Moderateur/User : not checked
Relations:
  1 utilisateur peut avoir plusieurs clients: not checked
  -> besoin, de rajouter des relations
