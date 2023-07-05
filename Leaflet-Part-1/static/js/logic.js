//url to geoJSON of earthquake data  
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
//Followed format of example given in class for this function
//create the createFeatures function to log specific features from each earthquake in the dataset
function createFeatures(earthquakeData) {

    //depth color function

    //size magnitude function
    
    //give each earthquake a circle marker that changes based on the depth and magnitude of the quake
    function onEachFeature(feature, layer) {
        let lat = feature.geometry.coordinates[1]
        let long = feature.geometry.coordinates[0]
        L.circleMarker([lat,long], {
            stroke: false,
            fillOpacity: 0.8,
            fillColor: depth(feature.geometry.coordinates[3]),
            radius: magnitude(feature.properties.mag)
        })
        //give each feature a popup that describes the place, time, and magnitude of the earthquake
        layer.bindPopup(`<h3>Place: ${feature.properties.place}</h3><hr><h3>Magnitude: ${feature.properties.mag}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p>`);
    }

    //create a geoJSON layer that contains the features array on the earthquakeData object
    //run the onEachFeature function once for each object in the array
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    //send earthquakes layer to the createMap function
    createMap(earthquakes);

}

//createMap function constructs the map from given tile layers
function createMap(earthquakes) {

// create base layer
    let base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  //make map object and add layers
    let myMap = L.map("map", {
    center: [39.05, -110.24],
    zoom: 5,
    layers: [base, earthquakes]
    });

}

//fetch the data
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


  
