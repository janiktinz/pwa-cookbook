# PWA cookbook

# Inhaltsverzeichnis
[1. Was ist eine PWA?](#1-was-ist-eine-pwa)  
[2. Web App Manifest](#2-web-app-manifest)   
    &nbsp; &nbsp; [2.1 Splashscreen](#21-splashscreen)   
    &nbsp; &nbsp; [2.2 Installation einer PWA](#22-installation-einer-pwa)   
[3. Service Worker](#3-service-worker)  
[4. Application Shell](#4-application-shell)  
[5. Offline Storage](#5-offline-storage)   
    &nbsp; &nbsp; [5.1 IndexedDB](#51-indexeddb)  
    &nbsp; &nbsp; [5.2 CacheAPI](#52-cacheapi)   
[6. Standortbestimmung](#6-standortbestimmung)   
    &nbsp; &nbsp; [6.1 Manuelle Standortbestimmung](#61-manuelle-standortbestimmung)   
    &nbsp; &nbsp; [6.2 Automatische Standorterkennung](#62-automatische-standorterkennung)    
[7. Tools](#7-tools)  
[8. Nützliche Links](#8-nützliche-links)  

# 1 Was ist eine PWA?
## Merkmale
* Progressiv (logisch): Unabhängigkeit vom verwendeten Browser
* Responsiv: Skalierbarkeit an jeden Bildschirm (Desktop, Smartphone oder Tablet)
* Offline-Unterstützung: Offline Benutzung möglich
* Aktualität: Keine manuellen Updates
* Sicher: Verwendung von https
* Auffindbar: SEO-Optimierung
* Kundenbindung: Unterstützung von Push-Benachrichtungen
* Installierbar: Hinzufügen zum Homescreen
* Verlinkbar: Verbreitung über URLs möglich   

# 2 Web App Manifest
Das Manifest definiert das Aussehen der App auf dem Homebildschirm und im App-Switcher. Im Weitern wird das Manifest in einer json-basierten Datei festgelegt und kann mit folgendem html-Code in den head des html-Dokuments eingebunden werden:
```html
<link rel="manifest" crossorigin="use-credentials" href="./manifest.json">
```
Dieser Link-Tag sorgt dafür, dass der Browser die json-Datei laden kann.  
Der folgende Code zeigt ein Web App Manifest:  
```json
{
    "dir": "ltr",
    "lang": "de-DE",
    "name": "PWA - Hoerweg",
    "short_name": "Hoerweg",
    "description": "PWA: Hoerweg des Odenwaldclubs",
    "scope": "/",
    "start_url": ".",
    "display": "standalone",
    "orientation": "portrait",
    "background_color": "white",
    "theme_color": "#FFFFFF",
    "icons": [
      {
        "src": "192x192.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "src": "512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    "author": {
      "name": ""
    }
  }
```
Das oben gezeigte Listing zeigt:
* (optional) `"dir"`: Angabe zur Schreibrichtung der Inhalte (`"ltr"` -> left to right)
* (optional) `"lang"`: Kürzel für die Sprache
* `"name"`: Name der Anwendung
* `"short_name"`: Kurzname für die Anwendung
* `"description"`: Beschreibung der Anwendung
* `"scope"`: In dieser Eigenschaft wird der Navigationscope definiert. Hierbei handelt es sich um eine URL, welche die erlaubten URLs angibt. Setzt man als Scope beispielsweise https://example/foo/, dürfen nur die URLs unterhalb dieser URL von der PWA aufgerufen werden. Die URL https://example/ darf dann nicht aufgerufen werden.
* `"start_url"`: Diese Eigenschaft gibt die Start-URL an, welche der Browser laden soll.
* `"display"`: Dieser Eintrag definiert den Anzeigemodi. Durch den Anzeigemodi `"standalone"` erscheint die PWA wie eine native App auf dem Desktop oder dem Smartphone. Die Webanwendung läuft schließlich ohne Browserelemente auf dem Desktop und dem Smartphone.
* `"orientation"`: Dieser Eintrag legt die Bildschirmausrichtung fest. Der Wert `"portrait"` legt fest, dass der Hochformatmodus verwendet werden soll.
* `"background_color"`: Definition der Hintergrundfarbe
* `"theme_color"`: Der Browser kann diese Eigenschaft verwenden, um Teile der Benutzeroberfläche entsprechend eines Farbwerts zufärben.
* `"icons"`: In diesem Eintrag kann man icons definieren. Eine Bildressource besteht aus den Angaben `"src"`, `"sizes"` und `"type"`. Über den Eintrag `"src"` gibt man die URL an, von der die Datei geladen werden kann. Der Eintrag `"sizes"` gibt die Abmessung der Bilddatei an. Im Weiteren kann man über `"type"` den MIME-Typ der Bildressource angeben. Der [RealFaviconGenerator](https://realfavicongenerator.net) ist ein guter Generator um Icons in unterschiedlichen Größen zu generieren.  
* `"author"`: Angabe der Autoren   

Hinweis:  
Apple Safari:   
Der mobile Safari-Browser (iOS 12.1.1) übernimmt derzeit noch nicht die Symbole, welche unter dem Eintrag `"icons"` definiert wurden. Das Setzen eines Homescreen-Icons gelingt derzeit aber über einen proprietären Weg. Man muss hierfür ein `link`-Element mit der Bezeichnung `apple-touch-icon` im Kopf des html-Dokuments setzen. Die Datei `apple-touch-icon.png` muss eine Abmessung von 180x180 haben. Folgenden Code muss man in den Kopf des html-Dokuments einsetzen:   
```html 
<link rel="apple-touch-icon" href="apple-touch-icon.png">
```  

## 2.1 Splashscreen   
Einige Webbrowser erlauben das Überbrücken der Ladezeit beim Starten einer PWA durch die Anzeige eines Splashscreen, wodurch die Anwendung nativer wirkt. Diese Anzeige stellt aber kein Feature des Web App Manifests dar, sondern wird von einigen Browsern mit den Eigenschaften des Manifest umgesetzt. Nicht jeder Browser, welcher das Manifest unterstützt, zeigt einen Splashscreen an.   

Chrome Android:
Google empfiehlt folgende Angaben zur Unterstützung eines Splashscreens:   
* Der Eintrag `"name"` muss im Manifest gesetzt sein.
* Die Eigenschaft `"background-color"` muss im Manifest auf einen gültigen Farbwert gesetzt sein.
* Der icons-Array muss mindestens ein Icon mit den Abmessungen 512x512 enthalten. Des Weitern muss dieses Icon im png-Format vorliegen.

Safari auf iOS:   
Bei iOS wird die Anzeige von Splashscreens nicht (nur) über das Web App Manifest unterstützt, sondern über proprietäre Mittel. In diesem Zusammenhang muss man einige Elemente in den html-Kopf des html-Dokuments einfügen. Das folgende Listing zeigt einen Ausschnitt der Umsetzung:   
```html
<meta name="apple-mobile-web-app-capable" content="yes">     
<link href="splashscreens/iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />   
<link href="splashscreens/iphone6_splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />   
<link href="splashscreens/iphoneplus_splash.png" media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />    
<link href="splashscreens/iphonex_splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />   
<link href="splashscreens/iphonexr_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />   
```   

Die Splashcreens für iOS kann man sich mit dem [iOS Splash Screen Generator](https://appsco.pe/developer/splash-screens ) generieren lassen.   

## 2.2 Installation einer PWA    
Progressive Web Apps können dem Nutzer einen Banner zur Installation anzeigen. Es handelt sich hierbei aber nicht um eine klassische Installation, sondern es wird lediglich ein Eintrag in der Programmliste gemacht.   
Das Programm [web-app-manifest](http://192.168.178.106/janiktinz/pwa-cookbook/tree/master/codeExamples/web-app-manifest) in codeExamples implementiert eine mögliche Umsetzung einer Installationsroutine für eine PWA. Man kann die PWA über den Button "zum Startbildschirm hinzufügen" zur Programmliste hinzufügen. Dieses Vorgehen funktioniert zurzeit nur mit Google Chrome für Desktop und Android (getestet auf Mac mit Google Chrome Version 71). Hierfür muss man bei Google Chrome (Version 71) für Mac und Linux derzeit noch ein Flag im Chrome-Browser unter chrome://flags/#enable-desktop-pwas aktivieren. Man kann eine PWA auch wieder aus der Programmliste entfernen. Bei Google Chrome (getestet auf Mac mit Google Chrome Version 71) muss man chrome://apps in die Adresszeile eingeben und erhält schließlich eine Übersicht über alle installierten Apps. Mit einem Rechtsklick auf die zu löschende Anwendung und einem Klick auf "Löschen" ist die Anwendung entfernt.   

Das Programm web-app-manifest enthält die Datei [app.js](http://192.168.178.106/janiktinz/pwa-cookbook/blob/master/codeExamples/web-app-manifest/app.js), in welcher die Installionsroutine implementiert ist.    
Listing app.js:   
```javascript
// javascript button for add to homescreen
const installButton = document.getElementById('install');
let deferredPrompt;

// prompt install banner
window.addEventListener('beforeinstallprompt', evt => {
    event.preventDefault();
    deferredPrompt = evt;
    installButton.style.display = 'block';
});

// wait for click event
installButton.addEventListener('click', async () => {
    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    console.log(choiceResult.outcome);
});
```
Webanwendungen können sich durch das Ereignis `beforeinstallprompt` informieren, ob die Voraussetzungen zur Installation der Webseite erfüllt sind. In der Variablen `deferredPrompt` wird die Aufforderung zur Installation gespeichert. Die Methode `window.addEventListener(‘beforeinstallprompt’ …)` registriert das beforeinstallprompt Event. Der Aufruf `event.preventDefault()` verhindert einen automatisierten Banneraufruf durch den Browser. Die Zeile `installButton.style.display = ‘block’`schaltet die Schaltfläche (Button) sichtbar. Die Methode `installButton.addEventListener(‘click’ …)` registriert das click Event für den Button. Die Zeile `await deferredPrompt.prompt()` aktiviert den Installationshinweis (Banner), wenn der Button geklickt wurde. Das Argument `await deferredPrompt.userChoice` wertet die Benutzerauswahl aus.

Quellen:
* https://developers.google.com/web/fundamentals/web-app-manifest/ (Zugriff: 15.01.2019)
* https://developers.google.com/web/fundamentals/app-install-banners/ (Zugriff: 15.01.2019) 

# 3 Service Worker
## Allgemein  
Der Service Worker (SW) dient zur Umsetzung der Offlinefunktionalität und zur Verarbeitung von Pushbenachrichtigungen. Außerdem läuft der SW in einem eigenen Thread und kann nicht auf das Document Object Model (DOM) zugreifen. Er besitzt einen eigenen Cache und kann sich in jeden ausgehenden Netzwerkverkehr einschalten. 
Der SW entscheidet bei einer Netzwerkanfrage, ob er die Daten aus seinem Cache holt oder ob er die Anfrage an das Netzwerk weiterleitet. 
Die Offlinefähigkeit von PWAs wird genau so gewährleistet.
Der SW ist unabhängig von Tab oder Fenster, dies ist auch die Voraussetzung für die Implementierung von Push-Benachrichtungen. 
Der Webbrowser kann den SW aufrufen, wenn eine Netzwerkanfrage behandelt werden muss oder eine Push-Benachrichtung eintrifft.
Der SW dient also als Hintergrunddienst. 
Der SW ist sehr mächtig und kann aus diesem Grund auch nur über https installiert werden. Die einzige Ausnahme ist der localhost für Entwicklungszwecke.

## Implementierung
Die folgende Erklärung eines SWs bezieht sich auf das Programm [simple-pwa-example](http://192.168.178.106/janiktinz/pwa-cookbook/tree/master/codeExamples/simple-pwa-example), welches in diesem Repo unter codeExamples zu finden ist.   

### Registrierung
Zunächst muss der SW registriert werden:  
```javascript   
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log(reg))
            .catch(err => console.log(err));
}   
```  
Der oben gezeigte JavaScript Code fragt mittels des if-Statements ab, ob der Browser SWs unterstützt oder nicht. Bei einer Unterstützung durch den Browser wird der SW registriert. Der SW ist in der JavaScript-Datei [sw.js](http://192.168.178.106/janiktinz/pwa-cookbook/blob/master/codeExamples/simple-pwa-example/sw.js) implementiert.

Der Lebenszyklus eines SWs ist in drei Bereiche eingeteilt:
* Installieren
* Aktivieren
* Fetch

### Installation
Der folgende Code wird beim ersten Besuch der PWA ausgeführt und der SW wird installiert:
```javascript  
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        // open the cache
        caches.open(cacheName).then(function(cache) {
            // add files to the cache
            return cache.addAll(filesToCache);
        })
    );
});
```  
Im Rahmen der Registrierung wird die Installation des SWs ausgeführt. Im Service-Worker-Skript wird das Ereignis `install` ausgelöst. Das Beispiel zeigt wie sich der Entwickler mithilfe der Methode `addEventListener()` für dieses Ereignis registrieren kann. Die Methode `addEventListener()` wird auf dem globalen Service-Worker-Scope `self` aufgerufen. Im Weiteren sorgt die Methode `waitUntil()` dafür, dass der SW solange in der Installationsphase bleibt bis die erforderlichen Schritte innerhalb der Funktion abgeschlossen sind.   
In dem Installationsschritt kann der SW bereits seinen Zwischenspeicher vorbereiten, indem er bereits einige Ressourcen in seinen Cache lädt.   
Die Variable `filesToCache` enthält ein Array mit allen Dateien, welche gecacht werden sollen.  
Die Variable `cacheName` steht für den Namen des Caches. Im Chrome-Browser kann man die installierten Service Worker unter dem Link 
chrome://serviceworker-internals anzeigen lassen. 

### Aktivierung
Der folgende Code dient zur Aktivierung des SWs:
```javascript  
self.addEventListener('activate', function(event) {
    /* e.g. open a database, delete the cache or do something else */  
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(key) {
                if( key !== cacheName) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});
```
Zunächst muss sich der Entwickler für das Ereignis `activate` mithilfe der Methode `addEventListener()` registrieren. In diesem Ereignis kann man eine Datenbank z.B.: IndexedDB (siehe Abschnitt [Offline Storage](#5-offline-storage)) öffnen oder den SW Cache löschen. Während dieses Skript durchlaufen wird, updated der SW seinen Cache. Die Methode `self.clients.claim()` sorgt dafür, dass der SW sofort die Kontrolle über die Webanwendung erlangt.   

### Fetch
Der folgende Code wird ausgeführt, wenn eine ausgehende Netzwerkanfrage anliegt:
```javascript
self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetch', event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
```
Bei dem Ereignis `fetch` handelt es sich um ein funktionales Ereignis, d.h. dieses Ereignis wird erst ausgeführt, wenn der SW bereits intalliert und aktiviert ist.   
Zunächst registriert sich der SW auf das Ereignis `fetch`, um eine Netzwerkanfrage abfangen zu können. Der SW sucht zuerst nach einer Antwort in seinem Cache und wenn er eine Antwort findet beantwortet er diese entprechend. Wenn der SW keine Antwort im Cache findet, dann wird eine echte Netzwerkanfrage abgesetzt. Das ist völlig transparent für den Anwendungscode.   
Die Eigenschaft `request` steht auf dem Ereignisargument `event` zu Verfügung, diese Eigenschaft erlaubt den Zugriff auf die Netzwerkanfrage. Der SW kann mithilfe der Methode `respondWith()` eine HTTP-Response zurückgeben. 

Quellen:
* https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/ (Zugriff: 15.01.2019)   

# 4 Application Shell 
Eine Application Shell (App Shell) stellt den Anwendungsrahmen, also die Benutzeroberfläche, welche fast immer angezeigt wird, dar. Hierzu gehören die Menüs, der Titel und die Statusleiste einer PWA. Die Quelldateien der App Shell sollen stets offline vorgehalten werden, damit die PWA wie eine native App wirkt. Das Grundgerüst der PWA kann also sofort beim Start der Anwendung geladen werden, auch wenn keine Internetverbindung vorhanden ist. Des Weiteren spart der Benutzer der PWA Datenvolumen, da das Grundgerüst stets offline zur Verfügung steht. Außerdem implementiert die App Shell die Navigationselemente, welche verschiedene Schichten der PWA verbinden. Durch die Implementierung einer offlinefähigen App Shell ist die PWA zuverlässiger und nativer.

Quelle:   
* https://developers.google.com/web/fundamentals/architecture/app-shell (Zugriff: 15.02.2019)  

# 5 Offline Storage
Der Service Worker (SW) kann Antworten auf Netzwerkanfragen selbstständig zusammensetzen, dies kann z.B.: über die CacheAPI oder die IndexedDB umgesetzt werden.

## 5.1 IndexedDB
Die folgende Erklärung der Browserdatenbank IndexedDB bezieht sich auf das Programm [indexedDB](http://192.168.178.106/janiktinz/pwa-cookbook/tree/master/codeExamples/indexedDB), welches in diesem Repo unter codeExamples zu finden ist. 

Die Indexed Database API (IndexedDB) implementiert eine JavaScript-basierte und objektorientierte Browserdatenbank, auf welche die Webanwendung und der SW Zugriff hat. Die IndexedDB ist sehr gut für die Speicherung von strukturierten Anwendungsdaten geeignet. Die native IndexedDB-Schnittstelle ist schwierig zu bedienen, deshalb kann man auf die Bibliothek [Dexie.js](http://dexie.org) zurückgreifen.  

In der JavaScript-Datei [db.js](http://192.168.178.106/janiktinz/pwa-cookbook/blob/master/codeExamples/indexedDB/db.js) wird gezeigt, wie eine Datenbankverbindung erzeugt werden kann.   
Erzeugung einer Datenbankverbindung:   
```javascript
self.myDB = new Dexie('MyDB');
```
Die Konstruktorfunktion `Dexie('MyDB')` erzeugt eine neue Datenbank mit dem Namen `MyDB`.   
Festlegung des Datenbankschemas:   
```javascript
self.myDB.version(1).stores({ student: '++id, firstName, lastName, studNumber' });
```
IndexedDB Datenbanken bauen auf dem Versionierungsprinzip auf, deshalb muss über eine Versionsnummer zugegriffen werden. Auf dem Rückgabewert der Methode `version(1)` kann die Methode `stores()` aufgerufen werden. Die Methode `stores()` dient zum Festlegen des Datenbankschemas. Zunächst wird der Objektspeicher `student` angelegt. Der erste Eintrag legt immer den Primärschlüssel der Tabelle fest. In diesem Zusammenhang kann man den Primärschlüssel als autoinkrementierten Primärschlüssel (++id) oder als eindeutigen Index (&id) festlegen. Der Name für den Primärschlüssel id ist frei wählbar.   
Hinzufügen von initialen Datensätzen:   
```javascript
self.myDB.on('populate', () => {
    myDB.student.add({ firstName: 'Max', lastName: 'Mustermann', studNumber: 757733 });
});
```
Beim Anlegen der Datenbank wird das Ereignis `populate` ausgelöst. Die Webanwendung registriert sich auf diesem Ereignis mithilfe der Methode `on()`. Auf dem Datenbankenobjekt `myDB` kann man über die Tabelle `student` auf die Methode `add()` zugreifen. Der Entwickler kann mithilfe der Methode `add()` die Tabelle `student` mit einem initialen Datensatz befüllen.   

In der JavaScript-Datei [app.js](http://192.168.178.106/janiktinz/pwa-cookbook/blob/master/codeExamples/indexedDB/app.js) wird gezeigt, wie eine Datenbankverbindung geöffnet werden kann. 
Öffnen einer Datenbankverbindung:   
```javascript
myDB.open()
        .then(() => {
            if ('serviceWorker' in navigator) {
                return navigator.serviceWorker.register('sw.js');
            }
        }
```  
Eine Datenbankverbindung kann mithilfe der Methode `open()` auf dem Datenbankenobjekt `myDB` geöffnet werden. Anschließend wird der SW registriert.   
Im Weiteren kann der SW nicht auf das DOM des Elterndokuments zugreifen, deshalb kann eine Kommunikation zwischen der Webanwendung und dem SW nur über die Methode `postMessage()` stattfinden.    
Senden einer Nachricht aus der Webanwendung: 
```javascript
navigator.serviceWorker.ready
.then(registration => registration.active.postMessage('the answer to life, the universe and everything'));
```
Auf dem `serviceWorker` steht die Eigenschaft `ready` zur Verfügung, welches ausgelöst wird, sobald ein SW verfügbar ist. Die Eigenschaft `active` ermöglicht es auf den aktiven SW zuzugreifen. Auf dieser Eigenschaft steht die Schnittstelle `postMessage()` zur Verfügung.   
Registrierung für das Ereignis `message`:   
```javascript
navigator.serviceWorker.addEventListener('message', event => console.log('sw:', event.data));
```
Die Webanwendung muss sich für das Ereignis `message` registrieren, um Nachrichten zu erhalten.   

In der JavaScript-Datei [sw.js](http://192.168.178.106/janiktinz/pwa-cookbook/blob/master/codeExamples/indexedDB/sw.js) muss die Nachricht entgegengenommen werden und entsprechend geantwortet werden.    
Registrierung für das Ereignis `message` und Antwort des SWs:   
```javascript
self.addEventListener('message', event => {
    console.log('app:', event.data);
    if (event.data === 'the answer to life, the universe and everything') {
        event.source.postMessage('42');
    }
});
```
Im Ergebnisargument `event` steht der Inhalt der Nachricht von der Webanwendung in der Eigenschaft `data`. Die Informationen zum Absender der Nachricht befinden sich in der Eigenschaft `source`, über diese Eigenschaft kann mithilfe der Methode `postMessage()` eine Antwort zurück geschickt werden.   
Abschließend ist anzuführen, dass die direkte Kommunikation zwischen dem SW und der Webanwendung selten benötigt wird.  

Quellen:   
* https://github.com/pwapraxis/beispiele/tree/master/kapitel05 (Zugriff: 15.01.2019)   

## 5.2 CacheAPI
Die folgende Erklärung zur CacheAPI bezieht sich auf das Programm [cacheAPI](http://192.168.178.106/janiktinz/pwa-cookbook/tree/master/codeExamples/cacheAPI), welches in diesem Repo unter codeExamples zu finden ist.   

### Allgemein   
Die CacheAPI löst den veralteten HTML5 Application Cache ab. Der lokale Zwischenspeicher des Service Workers kann mithilfe der CacheAPI angesteuert werden. Der Cache des Service Workers ist zum Speichern von statischen Quelldateien sehr gut geeignet. Im Weiteren sollten offline Implementierungen zukünftig immer auf die Funktionalität des Service Workers setzen.   
Der Service Worker und die Webanwendung können auf den Cachespeicher zugreifen. Entwickler sollten den Zugriff auf den Cachespeicher allerdings immer über den Service Worker implementieren. Außerdem ist die CacheAPI asynchron entworfen und kann nur verwendet werden, wenn die Webseite über HTTPS ausgeliefert wurde.  
### Caches verwalten   
Jeder Cache kann vom Entwickler frei benannt werden. Caches sollten immer einen eindeutigen Namen und idealerweise auch eine Versionsnummer haben. Eine mögliche Bennenung  wäre cacheName-files-v1. Die nachfolgenden Codeabschnitte sind der Datei cache.js entnommen.  
Der folgende Code zeigt wie man einen Cache öffnet:   
```javascript
self.caches.open('cacheAPI-files-v1').then(cache => console.log(cache));
```
Auf der Eigenschaft `caches` wird die Methode `open()` aufgerufen. Die Methode `open()` nimmt dabei den Namen des Caches entgegen.  

Der folgende Code zeigt, wie man eine Auflistung aller verfügbaren Caches im Browser erhält:    
```javascript
self.caches.keys().then(caches => console.log(caches));
```
Die Methode `keys()` gibt ein Array mit den Namen aller verfügbaren Caches zurück.   

Der Cache kann durch folgenden Code wieder gelöscht werden:
```javascript
self.caches.delete('cacheAPI-files-v1').then(success => console.log(success));
```
Die Methode `delete()` löscht den Cache mit dem angegebenen Namen und gibt dabei einen Wahrheitswert zurück.    

Im Weiteren gibt es die Möglichkeit einzelne Cacheeinträge gezielt zu löschen:      
```javascript
self.caches.open('cacheAPI-files-v1').then(cache => cache.delete('pwa.jpg'));
```
In diesem Codeabschnitt wird der Cache mit dem Namen `cacheAPI-files-v1` zunächst geöffnet und schließlich wird über die Methode `delete()` die jpg-Datei `pwa.jpg` aus dem Cache entfernt.  

Der folgende Code zeigt die Methode `add()`:   
```javascript
self.caches.open('cacheAPI-files-v1').then(cache => cache.add('pwa.jpg'));
```
Mithilfe dieser Methode kann man Ressourcen abrufen und die Antwort wird dabei direkt in den Cache gelegt. Im Hintergrund wird bei dieser Anfrage ein fetch() abgesetzt. Im Weiteren hat der Entwickler die Möglichkeit mehrere Ressourcen anzufragen. Bei größeren Projekten gibt es schließlich mehrere HTML-, JavaScript-, CSS-Dateien und Bilder, welche in einer Operation angefragt werden müssen. In diesem Fall kann ein Entwickler die Methode `addAll()` benutzen. In der Datei sw.js wird diese Methode in der Installationsroutine des Service Workers verwendet.   

Nun stellt sich die Frage wie man gecachte Antworten wieder aus dem Cache holen kann. Hierfür gibt es die Methoden `match()` und `matchAll()`. In der Datei sw.js wird in der Fetchroutine die Methode `match()` verwendet. 
```javascript
// catch the network query and answer from cache or network
self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetch', event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
```
In diesem Codeabschnitt wird auf den Ereignisargumenten `event` die Methode `respondWith()` aufgerufen, damit übernimmt der Service Worker die Kontrolle über die Antwort. Die Anfrage, welche in der Eigenschaft `request` zur Verfügung steht, wird mithilfe der Methode `match()` gegen die Cacheinhalte geprüft. Der Cache kann die Anfrage entweder beantworten oder es wird über die Methode `fetch()` eine Netzwerkanfrage gestartet. Die Methode `matchAll()`, welche in diesem Beispiel nicht dargestellt ist, gibt alle vorhandenen Cacheantworten zurück.   

### Speicherkontigent im Browser abfragen    
Der Cachespeicher teilt sich mit den anderen Speichertechnologien (z.B.: IndexedDB) einen maximalen Speicherplatz (Quota). Der Speicherplatz hängt vom jeweiligen Browser ab.   
* Chrome: <6% of free space       
* Firefox: <10% of free space   
* Safari: <50MB   

Quelle: https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa (Zugriff: 15.02.2019)  

Im Webbrowser Google Chrome kann man den belegten Webseitespeicher unter der Registerkarte Application -> Clear Storage einsehen. An dieser Stelle kann man auch über die Schaltfläche Clear Site Data den Websitespeicher komplett löschen. Die Service Worker Registrierung kann dabei auch gelöscht werden. Die Option ist für Entwicklungszwecke sehr hilfreich, da die Seite wie für einen neuen Benutzer ausgeliefert wird. Der lokale Zustand einer Webseite wird damit komplett zurückgesetzt.   

### Caching-Strategien

Jake Archibald stellt auf seinem Blog verschiedene Caching-Strategien vor (Blogpost https://jakearchibald.com/2014/offline-cookbook). 

Caching-Strategien:   
* Cache Only
* Network Only
* Cache, falling back to network
* Cache & network race
* Network falling back to cache
* Cache then network
* Generic fallback
* ServiceWorker-side templating

#### Cache only  
Diese Strategie ist der einfachste Fall, da die Anfragen der Webseite direkt aus dem Cache geholt werden. Hierbei müssen alle erforderlichen Antworten im Cache vorhanden sein. Dem Benutzer der Webseite wird ein Verbindungsfehler angezeigt, wenn keine passenden Antworten im Cache sind.
Das folgende Listing zeigt die Umsetzung dieser Strategie:
```javascript
self.addEventListener('fetch', (event) => {
  // If a match isn't found in the cache, the response
  // will look like a connection error
  event.respondWith(caches.match(event.request));
});
```
Dieses Vorgehen ist für statische Inhalte geeignet wie beispielweise die App Shell.

#### Network Only   
Bei dieser Strategie werden die Anfragen nur über das Netz beantwortet. 
Das folgende Listing zeigt die Umsetzung dieser Strategie:
```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
  // or simply don't call event.respondWith, which
  // will result in default browser behaviour
});
```
Diese Variante eignet sich für Anfragen wie analytische Pings oder non-GET Requests.  

#### Cache, falling back to network   
Diese Strategie wird häufig benutzt, da sie die Strategie "Cache Only" und "Network only" vereinigt. Die Antworten, welche im Cache liegen, werden über den Cache beantwortet und die Antworten, welche nicht im Cache liegen, werden über das Netz beantwortet. Das folgende Listing zeigt die Umsetzung dieser Strategie:
```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    const response = await caches.match(event.request);
    return response || fetch(event.request);
  }());
});
```

#### Cache & network race    
Diese Strategie versucht eine Anfrage zeitgleich über das Netz und den Cache zu beantworten. Diese Caching Strategie ist für Geräte mit langsamen Festplatten geeignet. 

#### Network falling back to cache    
Bei dieser Strategie wird eine Ressource zunächst über das Netz angefragt. Die Anfrage wird hierbei nur durch den Cache beantwortet, wenn eine schwache oder keine Internetverbindung besteht. Das folgende Listing zeigt die Umsetzung dieser Strategie:
```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(event.request);
    }
  }());
});
```

#### Cache then network    
Bei dieser Strategie wird zunächst versucht die Anfrage über den Cache zu beanworteten. Es wird aber auch versucht die Anfrage über das Netzwerk zu beantworten. Der Benutzer der Anwendung bekommt die Inhalte sofort angezeigt, wenn die passende Antwort im Cache vorhanden ist. In dem Fall, dass keine passende Antwort im Cache ist, bekommt der Anwender noch keinen Inhalt angezeigt. Unabhängig von dem Ausgang der Cacheabfrage wird die Anfrage auch über das Netz beantwortet. Wenn die Anfrage über das Netz erfolgreich war, werden dem Anwender die neuen Daten angezeigt. Des Weiteren werden die alten Daten des Caches durch die neuen Daten ersetzt. Falls die Anfrage weder vom Cache noch vom Netz beantwortet werden konnte, könnte man eine Fehlermeldung ausgeben.

#### Generic fallback    
Diese Strategie ist eine Erweiterung der Strategie "Cache, falling back to network". Bei dieser Variante des Cachings wird eine generische Antwort zurückgegeben, wenn die Anfrage weder durch den Cache noch über das Netz beantwortet werden kann. Es könnte beispielseise eine statische HTML-Seite im Cache hinterlegt sein, welche den Benutzer der PWA darauf hinweist, dass der Browser offline ist. Das folgende Listing zeigt die Umsetzung dieser Strategie:
```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    // Try the cache
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;

    try {
      // Fall back to network
      return await fetch(event.request);
    } catch (err) {
      // If both fail, show a generic fallback:
      return caches.match('/offline.html');
    }
  }());
});
```

#### ServiceWorker-side templating     
Der Cache des Service Workers wird zum Speichern statischer Antworten verwendet. Einige Serverantworten können aber auch zustandsbehaftet sein, deshalb kann man den Service Worker mit einer Templating Engine ausstatten. In dem Zwischenspeicher können dann HTML-Templates mit Platzhaltern vermerkt werden. Der Service Worker ersetzt vor der Rückgabe an die Anwendung alle Platzhalter mit den gültigen Werten.

Quellen:     
* https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/cache-api (Zugriff: 15.02.2019)   
* https://jakearchibald.com/2014/offline-cookbook/#cache-only (Zugriff: 15.02.2019)


# 6 Standortbestimmung

Die Standortbestimmung kann mit Hilfe von JavaScript realisiert werden. Mit Hilfe der Geolocation-API kann man die geografische Position eines Nutzers 
bestimmen. Die API gibt Längen- und Breitengrad zurück. Durch diese API ist es möglich, dem Nutzer ortsbezogene Dienste anzubieten. Die API ist mit 
allen neueren Browsern kompatibel.  

Im Ordner codeExamples liegt das Testprogramm [geolocation](http://192.168.178.106/janiktinz/pwa-cookbook/tree/master/codeExamples/geolocation).   

## 6.1 Manuelle Standortbestimmung
Der folgende JavaScript Code zeigt eine mögliche Implementierung für eine manuelle Standortbestimmung:
```javascript
var coord = document.getElementById("coordinate"); 

function searchLocation() { 
  if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(showLocation); 
  } else { 
    coord.appendChild(document.createTextNode("Ihr Browser unterstützt keine Standortermittlung. ")); 
  } 
} 

function showLocation(location) {

  if(coord.firstChild){
    coord.removeChild(p.nodeValue);
  }
  coord.appendChild(document.createTextNode("Breitengrad: " + location.coords.latitude + " Grad | "));
  coord.appendChild(document.createTextNode("Längengrad: " + location.coords.longitude + " Grad | ")); 
  coord.appendChild(document.createTextNode("Genauigkeit: " + location.coords.accuracy + " Meter "));
}
```

Über den Button “Standortbestimmung” kann der aktuelle Standort (Breiten- und Längengrad) sowie die Genauigkeit ausgegeben werden. Die Methode `searchLocation()` wird beim Drücken des Buttons "Standortbestimmung" aufgerufen.  
Die Standortkoordinaten befinden sich im Objekt `location`:   
* Breitengrad: location.coords.latitude
* Längengrad: location.coords.longitude 
* Genauigkeit (in Metern): location.coords.accuracy

## 6.2 Automatische Standorterkennung
Der Abstand zwischen dem aktuellen Ort und den eingespeicherten Orten (C10, D14, D19) wird alle 10 Sekunden überprüft `(var options = {timeout:10000};)`. Die Methode `watchPosition()` überwacht die Methoden `calculateLocation()` und `errorHandler()`, welche also alle 10 Sekunden aufgerufen werden. 

Der folgende JavaScript Code zeigt die Methode `calculateLocation()`:
```javascript
function calculateLocation(location) 
{
  if(p.firstChild)   // delete old content in <p>
  {
    p.removeChild(p.firstChild); 
  }
  // current position
  var currentLat = location.coords.latitude;
  var currentLon = location.coords.longitude;
  // Hochschule Darmstadt - C10
  var c10Lat = 49.867320;
  var c10Lon = 8.638233;
  // Hochschule Darmstadt - D14
  var d14Lat = 49.866195;
  var d14Lon = 8.641527;
  // Hochschule Darmstadt - D19
  var d19Lat = 49.865510;
  var d19Lon = 8.640264;

  var distance;
  distance = calculateDistance(currentLat, currentLon, c10Lat, c10Lon);
  check("C10", distance);
  distance = calculateDistance(currentLat, currentLon, d14Lat, d14Lon);
  check("D14", distance);
  distance = calculateDistance(currentLat, currentLon, d19Lat, d19Lon);
  check("D19", distance);

  if(!p.firstChild)
  {
    p.appendChild(document.createTextNode("Keine Station gefunden"));
  }
}
```
* Bestimmung der aktuellen Position (Breiten- und Längengrad)
* Speicherung der Positionen von den Gebäuden C10, D14 und D19 in Variablen  

Der folgende JavaScript Code zeigt die Methode `calculateDistance()`:
```javascript
function calculateDistance(lat1, lon1, lat2, lon2)
{
  var radius = 6371;   // earth radius: 6371 km
  var lat = degreeToRadians(lat2 - lat1);
  var lon = degreeToRadians(lon2 - lon1);
  var a = Math.sin(lat / 2) * Math.sin(lat / 2) + Math.cos(degreeToRadians(lat1)) * Math.cos(degreeToRadians(lat2)) * Math.sin(lon / 2) * Math.sin(lon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = radius * c;
  var distance = Math.abs(d)*1000;   // distance in meter

  return distance;
}
```
* Aufruf der Methode `calculateDistance()`: Berechnung der Distanz

Der folgende JavaScript Code zeigt die Methode `check()`:
```javascript
function check(name, distance)
{
  if(distance <= 100) 
  {
    p.appendChild(document.createTextNode("Ort: " + name));
  }
}
```
* Aufruf der Methode `check()`: Überprüfung, ob die aktuelle Position höchstens 100 Meter von einem eingespeicherten Gebäude entfernt ist. 
  * Ja, Gebäude ausgeben.
  * Nein, nichts tun.
* Am Ende der Methode `calculateLocation()` wird “Keine Station gefunden” ausgegeben, wenn kein Gebäude in der Nähe von der aktuellen Position ist.

Quellen:   
* [W3C](http://w3c.github.io/geolocation-api/) (Zugriff: 10.12.2018)
* [W3 Schools](https://www.w3schools.com/html/html5_geolocation.asp) (Zugriff: 10.12.2018) 

# 7 Tools
[Lighthouse](https://developers.google.com/web/tools/lighthouse/):   
Lighthouse ist ein Open-Source Tool von Google, um die Qualität einer Webseite zu untersuchen. Das Tool stellt Audits für Performance, Progressive 
Web App, Best Practices, Accessibility und SEO zur Verfügung. Man kann Lighthouse im Chrome-Browser aufrufen.
Aufruf von Lighthouse in Chrome DevTools:
1. Aufruf der zu untersuchenden Webseite
2. Öffnen der Chrome DevTools
3. Tab Audits auswählen
4. Audits starten
5. Lighthouse zeigt einen Analysebericht zur untersuchten Webseite
   
Abfrage aller Service Workers im Chrome-Browser:
- Eingabe des Links  chrome://serviceworker-internals in die Adresszeile 

[ngrok](https://ngrok.com/download):   
Ein Beispiel befindet sich in diesem Repo unter codeExamples in der Beispiel-Webanwendung [simple-pwa-example](http://192.168.178.106/janiktinz/pwa-cookbook/tree/master/codeExamples/simple-pwa-example).

# 8 Nützliche Links
* [Introduction to Progressive Web Apps (Offline First) - Part 1](https://auth0.com/blog/introduction-to-progressive-apps-part-one/) (Zugriff: 12.11.2018)
* [Introduction to Progressive Web Apps (Instant Loading) - Part 2](https://auth0.com/blog/introduction-to-progressive-web-apps-instant-loading-part-2/) (Zugriff: 12.11.2018)
* [Introduction to Progressive Web Apps (Push Notifications) - Part 3](https://auth0.com/blog/introduction-to-progressive-web-apps-push-notifications-part-3/) (Zugriff: 12.11.2018)
* [Progressive Web Apps, Teil 1: Das Web wird nativer](https://www.heise.de/developer/artikel/Progressive-Web-Apps-Teil-1-Das-Web-wird-nativ-er-3733624.html) (Zugriff: 15.02.2019)
* [Progressive Web Apps, Teil 2: Die Macht des Service Worker](https://www.heise.de/developer/artikel/Progressive-Web-Apps-Teil-2-Die-Macht-des-Service-Worker-3740464.html) (Zugriff: 12.11.2018)
* [Progressive Web Apps, Teil 3: Wie die Web-App zur App-App wird](https://www.heise.de/developer/artikel/Progressive-Web-Apps-Teil-3-Wie-die-Web-App-zur-App-App-wird-3464603.html) (Zugriff: 13.11.2018)
* [Progressive Web Apps, Teil 4: Eine Frage des Geldes](https://www.heise.de/developer/artikel/Progressive-Web-Apps-Teil-4-Eine-Frage-des-Geldes-3759686.html) (Zugriff: 15.02.2019)
* [Progressive Web Apps, Teil 5: Das App-Modell der Zukunft?](https://www.heise.de/developer/artikel/Progressive-Web-Apps-Teil-5-Das-App-Modell-der-Zukunft-3767383.html) (Zugriff: 15.02.2019)