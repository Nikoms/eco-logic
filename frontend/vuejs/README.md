#
- The use cases **must** be the same in front end and backend: Attention aux ids qui peuvent être vides (front) ou remplis (back)
- Unit test!
- E2E tests with VueJs
- Having another front end framework
- Check presenter interface: is it good? => Only keep getViewModel + present
- ElectricityMeterRepositoryInterface: Il y a un save et un update, car en fait ca va vers 2 use case différent si on utilise la classe "Api". Que faire?
- les presenters ne devraient avoir la méthode "present"... UNIQUEMENT! Du coup les view model vont aussi là bas
- Check le code "enAttendant" => C'est un quick fix deg, pas le temps de rajouter 2 use case pour le moment :)
- Du coup, pour les api, on peut dire qu'ils n'utilisent pas de view model pour le résultat... On pourrait retourner un truc du style presenter.cars. Comme ca les view model n'ont pas l'entity exact


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
