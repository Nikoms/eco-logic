# Refac
- Move @eco/core-co2 to @eco/domain/co2 + Make an api and so on...
- Unit test!
- E2E tests with VueJs
- Having another front end framework
- Check presenter interface: is it good? => Only keep getViewModel + present
- ElectricityMeterRepositoryInterface: Il y a un save et un update, car en fait ca va vers 2 use case différent si on utilise la classe "Api". Que faire?
- les presenters ne devraient avoir la méthode "present"... UNIQUEMENT! Du coup les view model vont aussi là bas
- Check le code "enAttendant" => C'est un quick fix deg, pas le temps de rajouter 2 use case pour le moment :)
- Du coup, pour les api, on peut dire qu'ils n'utilisent pas de view model pour le résultat... On pourrait retourner un truc du style presenter.cars. Comme ca les view model n'ont pas l'entity exact
- Water: Les noms des uses cases sont pas terribles

# TODO
- Water: revoir la ui et faire comme les autres: Afficher les compteurs + leur dernière valeur de compteur
- Utiliser https://www.chartjs.org/samples/latest/charts/bar/stacked.html pour les graphes des consommations (un par consommation).
- Faire une "interaction" get odometers qui fait un mix de car+odometer, plutot que de faire ca dans le fichier vue
- A chaque ajout d'un travel (ou tout ce qui a un impact), rajouter une ligne de co2 (tout reste reste à faire). Il faut biensur parfois prendre compte de l'historiquqe des "consumptions" (utilisation de l'event dispatcher)
- Graphique sur base du co2 (avec https://www.chartjs.org/samples/latest/charts/bar/stacked.html)
- Donner l'adresse de sa maison et de son bureau
- Utiliser le GPS pour détecter que le mec à bouger. D'abord, on peut commencer par un truc simple avec un bouton "find me" et qui dit qu'il est à x km de sa maison
- Ajouter les transports en commun
- Ajouter des trajets préfait?


Backend :
``` 
cd backend
yarn start
```

Frontend:

``` 
cd frontend
yarn serve
``` 


Links :

- https://vuetifyjs.com/en/components/lists
- Liste des icones: https://materialdesignicons.com/cdn/2.0.46/



# Translations
## Electricity
###  kWh => co2
- 100 => 20
- 500 => 110
- 1000 => 230
- 10000 => 2260

### Gaz kWh => co2
- 100 => 20
- 500 => 110
- 1000 => 210
- 10000 => 2140

### Mazout l => co2
- 100 => 320
- 500 => 1600
- 1000 => 3190
- 10000 => 31900

## Car
### Essence 1l/100 km/an => co2
- 1000000 => 28070

### Diesel 1l/100 km/an => co2
- 1000000 => 31670

### LPG 1l/100 km/an => co2
- 1000000 => 18620

## Flight
Tous les aéroports: https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat


0,11 à 0,13 kg de CO2 par km par passager en classe économique et
0,25 à 0,26kg de CO2 par km par passager en classe Business
0,39 kg de CO2 par km par passager en Première classe (seulement pour les vols long courrier).

Si on tient compte du forçage radiatif, les émissions sont à peu de choses près multipliées par 2.


### Brussels -> martinique (economy) (7049.66 km)
- Aller simple (1 personne): 778
### Brussels -> martinique (business)
- Aller simple (1 personne): 1832
### Brussels -> martinique (first)
- Aller simple (1 personne): 2744

### Brussels -> Netherlands, The Hague, Holland Spoor Rail Station (ZYH) (economy) (156.598 km)
- Aller simple (1 personne): 17
### Brussels -> Netherlands, The Hague, Holland Spoor Rail Station (ZYH) (business)
- Aller simple (1 personne): 34
### Brussels -> Netherlands, The Hague, Holland Spoor Rail Station (ZYH) (first)
- Aller simple (1 personne): 34


### ZYH-> Brussels -> martinique (economy)
- Aller simple (1 personne): 794
### ZYH-> Brussels -> martinique (business)
- Aller simple (1 personne): 1866
### ZYH-> Brussels -> martinique (first)
- Aller simple (1 personne): 2778



## sources:
https://e-rse.net/avion-pollution-comparaison-voiture-27321#gs.rhusfnIn
- 14 g de CO2/passager/km pour le train
- 42 g de CO2/passager/km pour une petite voiture
- 55 g de CO2/passager/km pour une voiture moyenne
- 68 g de CO2/passager/km pour un bus
- 72 g de CO2/passager/km pour un deux roue motorisé
- 285 g de CO2/passager/km pour un avion

==> 5 g de CO2/passager/km pour une voiture moyenne prend l’hypothèse que la voiture est occupée par 4
l faut garder à l’esprit qu’un vol Paris-New York en avion par exemple émet environ 1 tonne de CO2. Soit presque la totalité du « budget carbone » annuel auquel un français devrait se limiter s’il voulait vraiment lutter contre le changement climatique (1.22 tonnes par an et par habitant). Dans l’ensemble, réduire ses besoins en transport (en avion, mais aussi et surtout en voiture) est donc la meilleure manière de réduire son empreinte carbone.


https://eco-calculateur.dta.aviation-civile.gouv.fr/

Aéroport de départ : PARIS-CHARLES DE GAULLE  /  Aéroport de destination : MARSEILLE-PROVENCE
Distance : 653 km
Consommation : 27.4 Litres de kérosène par passager équivalent, soit 4.2 Litres aux 100km

Emissions de gaz à effet de serre, dont dioxyde de carbone (CO2), par passager équivalent
(c’est-à-dire pour un passager ou 100 kg de fret ou de poste) :
Gaz à effet de serre
(kg CO2e/passager équivalent)	dont CO2
(kg CO2e/passager équivalent)
Emissions associées au vol
69.8	69.1
Emissions pour la production
et la distribution de carburant
14.5	13.2
Emissions totales
84.3	82.3


A titre d’illustration, pour 1 kg de CO2 émis en vol :
-  Gaz à effet de serre émis en vol : 1,01 kg de CO2e
-  Gaz à effet de serre émis en phase amont : 0,21 kg de CO2e
-  Gaz à effet de serre émis sur l’ensemble des phases, amont et vol : 1,01+0,21 = 1,22 kg de CO2e











