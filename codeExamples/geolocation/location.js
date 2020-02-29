var p = document.getElementById("location"); 

var options = {timeout:10000};  // check position all 10 sec 
navigator.geolocation.watchPosition(calculateLocation, errorHandler, options); 

function errorHandler(err) 
{
  if(err.code == 1) {
     alert("Error: Zugriff verweigert!");
  } else if(err.code == 2) {
     alert("Error: Position ist nicht verfügbar!");
  }
}

function degreeToRadians(degree)   // calculate the radiant
{
  return degree * Math.PI / 180;
}

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

function check(name, distance)
{
  if(distance <= 100) 
  {
    p.appendChild(document.createTextNode("Ort: " + name));
  }
}

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