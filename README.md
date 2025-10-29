# Sijaintidatan näyttäminen kartalla — (Express, React, Leaflet ja Socket.IO)

Tässä dokumentissa kerrotaan, miten tehdään yksinkertainen web-sovellus, joka näyttää sijaintitetoa kartalla.

Sovellus tehdään Helsingin yliopiston [Full Stack open](https://fullstackopen.com/) -kurssin luvuissa 1—3 opetettujen periaatteiden mukaan.

Sovellus koostuu kolmesta osasta:
- Frontend (selaimessa ajettavassa asiakassovellus): React-sovellus, joka näyttää reitin OpenStreetMap-kartalla käyttäen Leaflet-pakettia. Reitin koordinaattipisteet näytetään myös listassa.
- Backend (palvelinsovellus): Express.js-sovellus, joka vastaanottaa GNSS-vastaanottimelta tai simulaattorilta saatua sijaintitietoa. Sijaintitiedot tallennetaan listaan.
- Simulator: Python-ohjelma, joka lähettää sijaintitietoa (latitude, longitude) HTTP POST -metodilla backend-sovellukselle.

Sovelluksessa käytetään Socket.IO-pakettia palvelimen ja asiakkaan väliseen kommunikointiin. Socket.IO:n avulla selaimessa näytettävä reitti päivittyy reaaliajassa, kun palvelin saa uutta dataa.

## Leaflet React-sovelluksessa

[Leaflet](https://leafletjs.com/) on avoimen lähdekoodin JavaScript-kirjasto, jonka avulla voi rakentaa web-pohjaisia karttasovelluksia. Leafletin avulla voidaan näyttää GeoJSON-muotoista paikkatietoa kartalla. Periaatteessa karttatiedon näyttämiseen riittää kuitenkin vain tieto pisteen pituus- ja laveyspiiristä. Leafletia voidaan käyttää yhdessä esimerkiksi ilmaisen [OpenStreetMap](https://www.openstreetmap.org/)-karttarajapinnan kanssa.

<img src="images/leafletexample.png" alt="Leaflet" style="width:40%;" />

Tässä harjoituksessa käytetään [React Leaflet](https://react-leaflet.js.org/)-pakettia, joka mahdollistaa nimensä mukaisesti Leafletin käyttämisen React-sovelluksessa.

Leafletin ja OpenStreetMapin sijaan karttasoveluksen voi tehdä esimerkiksi Google Maps Platformin tai MapQuestin palveluja käyttäen. Nämä palvelut vaativat kuitenkin luottokorttitietojen antamisen.

## Socket.io

[Socket.io](https://socket.io/) on reaaliaikaisten web-sovellusten tekemiseen tarkoitettu JavaScript-kirjasto. Socket.io:n avulla tehdään kaksisuuntaisen yhteys web-asiakkaan ja palvelimen välille. Socket.io-yhteys mahdollistaa datan työntämisen palvelimelta asiakkaille, mikä ei onnistu pelkkää HTTP-protokollaa käyttämällä.

Socket.io:ssa on oma kirjasto sekä asiakkaalle että palvelimelle. APIt ovat lähes samanlaiset.
Socket.io käyttää Web Socketteja. Socket.io tuo Web Sockettiin lisää toiminnallisuutta, kuten broadcastingin useille asiakkaille ja asynkronisen I/O:n. Socket.io:n avulla voidaan tehdä web-sovellus, jossa sivu päivittyy automaattisesti aina, kun palvelimelle tulee uutta dataa esimerkiksi HTTP POST -metodin välityksellä.

# Esimerkkisovelluksen tekeminen

Tässä ohjeessa kaikki kolme sovelluksen osaa (backend, frontend ja simulaattori) tehdään omiin hakemistoihinsa. Sovellukset käynnistetään myös erikseen.

Tee alla oleva hakemistorakenne:

React-Express-SocketIO-Example/
├── backend/
├── frontend/
├── simulator/

## Backend (Experss.js-palvelinsovellus)

### Asetukset package.json-tiedostoon

Alusta backend samalla tavalla kuin Full Stack open -kurssin luvun [3a](https://fullstackopen.com/osa3/node_js_ja_express) on neuvottu:

1. Mene hakemistoon React-Express-SocketIO-Example/backend ja avaa command prompt.
2. Anna komento npm init. Voit jättää kaikki kysytyt kohdat tyhjiksi.

Tuloksena syntyy tiedosto package.json backend-hakemiston juureen.

3. Avaa package.json ja lisää scripts-osion alle kaksi riviä "start" ja "dev" alla olevan mallin mukaan.
   
```
{
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}
```
### Pakettien asennus

Asenna tässä sovelluksessa tarvittavat paketit
```
npm install express
npm install cors
npm install socket.io
```  

### Sovelluksen runko



## Frontend (selaimessa ajettavassa React-sovellus)

## Simulaattori
