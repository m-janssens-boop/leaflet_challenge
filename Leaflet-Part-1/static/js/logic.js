let myMap = L.map("map", {
    center: [39.05, -110.24],
    zoom: 5
  });
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
  
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
//Followed format of example given in class for this function
//create the createFeatures function to log specific features from each earthquake in the dataset
function createFeatures(earthquakeData) {
    //give each feature a popup that describes the place, time, and magnitude of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><h3>${feature.properties.mag}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }

    //create a geoJSON layer that contains the features array on the earthquakeData object
    //run the onEachFeature function once for each object in teh array
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

}
d3.json(url).then(function(response) {
  
    console.log(response);
    features = response.features;
    
    //send response to the createFeatures function
    createFeatures(features);

    //build an array for the location of each earthquake
    let quakeArray = [];
  
    for (let i = 0; i < features.length; i++) {
      let location = features[i].geometry;
      if (location) {
        //console.log(location);
        quakeArray.push([location.coordinates[1], location.coordinates[0]]);
      }
  
    }
  

  
  });
  