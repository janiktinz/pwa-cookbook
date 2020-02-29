# simple-pwa-example

Dieses Beispiel zeigt das Grundgerüst einer Progressiven Web App.

Verwendete Komponenten:   
node.js:   
-Download unter https://nodejs.org/en/download 

lite-server:   
-Installation: npm install --global lite-server

ngrok:   
-Download unter https://ngrok.com/download 

Starten der Applikation über lite-server und ngrok:   
1. Terminal öffnen.   
2. Navigation in das Verzeichnis, in dem auch die index.html liegt.   
3. Eingabe des Befehls: lite-server   
Die Webseite wird unter http://localhost:3000 gehostet.      
4. Navigation in den Ordner, in dem die ngrok Datei liegt.   
5. Eingabe des Befehls: ./ngrok http 3000 (getestet unter macOS 10.14.2)   
Die Webseite wird unter der angezeigten verschlüsselten URL gehostet.   
6. Die angezeigte URL (https://...) in die Adresszeile des Web-Browsers eingeben.   
   
Progressive Web Apps können mithilfe von ngrok auch auf mobilen Endgeräten getestet werden.   

(Developers: Janik und Patrick Tinz)   