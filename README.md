[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# openwt

View for OpenWT test

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
