[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# openwt

View for OpenWT test. It consists in the follow requirements:

Create the „Boat App“. It’s a simple app, where a user can get a quick overview over
list of boats ...
The following use cases should be implemented:

Use Case 1
The user opens your app and gets a login screen. He has to login. After a successful
login he is navigated to the overview page (UC2).

Use Case 2
The user has a list of all boat resources

Use Case 3
The user can add or update or delete boat

Use Case 4
The user clicks on a boat item and gets a detail view over it.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Commit using commitizen
```
npm run commit
```

### Create releases
It will automatically generate the changelog, pump the versions correctly (if you are a good citizen)
```
npm run release:patch
npm run release:minor
npm run release:major
```

### Compiles, minifies, build and push docker for production
It will generate a build and deploy to docker hub based in the current version in the folder
```
npm run deploy
```

### Lints and fixes files (also runs on pre-push)
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
