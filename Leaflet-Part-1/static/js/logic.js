//url to geoJSON of last 7 days of all earthquake data  
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
//Followed format of example given in class for this function
//create the createFeatures function to log specific features from each earthquake in the dataset
function createFeatures(earthquakeData) {
//CHANGE COLORS TO MATCH LEGEND ON CANVAS AND FIGURE OUT HOW TO GET THEM TO SHOW UP CORRECTLY. ADD LEGEND INTO MAP
    //depth color function
    function circleColor(depth) {
        if (depth < 10) {
            return '#FFFF00';
        } else if (depth < 30) {
            return'#ffd700';
        } else if (depth < 50) {
            return'#ff8c00';
        }else if (depth < 70) {
            return'#FF0000';
        }else if (depth < 90) {
            return'#a52a2a';
        } else {
            return '#483d8b';
        }
    };

    //size of magnitude function
    function circleSize(mag) {
        return mag * 20000;
    };

    //give each feature a circle dependent on depth and magnitude and a popup that describes the place, time, and magnitude of the earthquake
    function onEachFeature(feature, layer) {
       layer.bindPopup(`<h3>Place: ${feature.properties.place}</h3><hr><h3>Magnitude: ${feature.properties.mag}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p>`);
    }
    
    //make pointToLayer function for circle markers
    function pointToLayer(feature) {
        
        return L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            stroke: false,
            interactive: true,
            fillOpacity: 0.8,
            fillColor: circleColor(feature.geometry.coordinates[3]),
            radius: circleSize(feature.properties.mag)
        });
    }

    //create a geoJSON layer that contains the features array on the earthquakeData object
    //run the onEachFeature function once for each object in the array
    //give each earthquake a circle marker that changes based on the depth and magnitude of the quake
    let earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: pointToLayer,
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
  
  });


  
