let myMap = L.map("map", {
    center: [39.82, -98.58],
    zoom: 5
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  d3.json(url).then(function(response) {
  
    console.log(response);
    features = response.features;
  
    let quakeArray = [];
  
    for (let i = 0; i < features.length; i++) {
      let location = features[i].geometry;
      if (location) {
        //console.log(location);
        quakeArray.push([location.coordinates[1], location.coordinates[0]]);
      }
  
    }
  
    let quake = L.heatLayer(quakeArray, {
      radius: 20,
      blur: 35
    }).addTo(myMap);
  
  });
  