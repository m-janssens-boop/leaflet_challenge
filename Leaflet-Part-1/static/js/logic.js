//url to geoJSON of last 7 days of all earthquake data  
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
//Followed format of example given in class for this function
//create the createFeatures function to log specific features from each earthquake in the dataset
function createFeatures(earthquakeData) {
//CHANGE COLORS TO MATCH LEGEND ON CANVAS AND FIGURE OUT HOW TO GET THEM TO SHOW UP CORRECTLY. ADD LEGEND INTO MAP
    //depth color function
    function circleColor(depth) {
        if (depth < 10) {
            return '#00FF00';
        } else if (depth < 30) {
            return'#ADFF2F';
        } else if (depth < 50) {
            return'#FFD700';
        }else if (depth < 70) {
            return'#FFA500';
        }else if (depth < 90) {
            return'#FF8C00';
        } else {
            return '#FF4500';
        }
    
    };

    //size of magnitude function
    function circleSize(mag) {
        return mag * 4;
    };

    //give each feature a circle dependent on depth and magnitude and a popup that describes the place, time, and magnitude of the earthquake
    function onEachFeature(feature, layer) {
       layer.bindPopup(`<h3>Place: ${feature.properties.place}</h3><hr><h3>Magnitude: ${feature.properties.mag}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p>`);
    }

    function style(feature) {
        return {
        stroke: true,
        interactive: true,
        fillOpacity: 0.8,
        fillColor: circleColor(feature.geometry.coordinates[2]),
        radius: circleSize(feature.properties.mag),
        weight: 1
        };
    };
    
    //make pointToLayer function for circle markers
    function pointToLayer(feature) {
        
        return L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], style(feature));
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

//createMap function constructs the map from given tile layers and adds legend
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

    //Make the legend
    //Ask BCS helped with the formatting of the legend
    let legend = L.control({position: "bottomright"});
        legend.onAdd = function() {
            let div = L.DomUtil.create("div", "info legend");
            let limits = [-10, 10, 30, 50, 70, 90];
            let colors = [
                "#98ee00",
                "#d4ee00",
                "#eecc00",
                "#ee9c00",
                "#ea822c",
                "#ea2c2c"];

            //add the min and max
            let legendInfo = "<h1>Depth of<br />Earthquake<br />(km)</h1>" + 
            "</div>";

            div.innerHTML = legendInfo;

            for (let i = 0; i < limits.length; i++) {
                div.innerHTML += "<i style='background: "
                  + colors[i]
                  + "'></i> "
                  + limits[i]
                  + (limits[i + 1] ? "&ndash;" + limits[i + 1] + "<br>" : "+");
              }
              return div;
            };
          
    // Adding the legend to the map
    legend.addTo(myMap);  
    

}

//fetch the data
d3.json(url).then(function(response) {
  
    console.log(response);
    features = response.features;
    
    //send response to the createFeatures function
    createFeatures(features);
  
  });
