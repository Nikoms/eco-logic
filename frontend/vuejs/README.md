#
- The use cases **must** be the same in front end and backend: Attention aux ids qui peuvent être vides (front) ou remplis (back)
- Unit test!
- E2E tests with VueJs
- Having another front end framework
- Check presenter interface: is it good?
- Il y a des imports de frontend-infra dans frontend-interface: Pas bie
- ElectricityMeterFakeApiRepository ne devrait pas utiliser le repo "backend" (hot fix)
- Checkout le commentaire là: "Api.addPowerConsumption". Le presenter a des méthodes que pour la vue "js" et ca, c'est pas bon
# frontend

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Run your end-to-end tests
```
yarn run test:e2e
```
