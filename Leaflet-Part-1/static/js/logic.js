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
    let legend = L.control({position: "bottomright"});
        legend.onAdd = function() {
            let div = L.DomUtil.create("div", "info legend");
            let limits = [-10,91]

            //add the min and max
            let legendInfo = "<h1>Depth of Earthquake (km)</h1>" + 
            "<div> class =\"labels\">" + 
            "<div> class =\"min\">" + limits[0] + "</div>" +
            "<div> class =\"max\">" + limits[limits.length - 1] + "</div>" +
            "</div>";

            div.innerHTML = legendInfo;

            limits.forEach(function(limit, index) {
                labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
              });
          
              div.innerHTML += "<ul>" + labels.join("") + "</ul>";
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


  
