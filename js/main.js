var map = L.map('map').setView([53.5510846, 9.99368179999999], 12);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  maxZoom: 18
}).addTo(map);

/* schönere mapbox version */

/*L.tileLayer('http://api.tiles.mapbox.com/v4/golian.ifca0pb9/{z}/{x}/{y}.png32?access_token=pk.eyJ1IjoiZ29saWFuIiwiYSI6IjB4aWtrWUkifQ.Gkl77qEV8DM5feblzjj67g', {
  attribution: '<a href="https://www.mapbox.com/about/maps/">© Mapbox © OpenStreetMap</a> <a href="https://www.mapbox.com/map-feedback/">Improve this map</a>',
  maxZoom: 18
}).addTo(map);*/


L.TopoJSON = L.GeoJSON.extend({
  addData: function (jsonData) {
    if (jsonData.type === "Topology") {
      for (key in jsonData.objects) {
        geojson = topojson.feature(jsonData, jsonData.objects[key]);
        L.GeoJSON.prototype.addData.call(this, geojson);
      }
    } else {
      L.GeoJSON.prototype.addData.call(this, jsonData);
    }
  }
});
// Copyright (c) 2013 Ryan Clark

var topoLayer = new L.TopoJSON();
topoLayer.addData(wahllok);
topoLayer.addTo(map);
topoLayer.eachLayer(handleLayer);

 
function handleLayer(layer){
  layer.setStyle({
    fillColor : '#fff',
    fillOpacity: 0.5,
    color:'#999',
    weight:1,
    opacity:0.5
  });
 
  layer.on({
    mouseover: enterLayer,
    mouseout: leaveLayer
  });
}
 
function enterLayer(){  
  var wahlbez = this.feature.properties.WahlBezSch;
  //get the properties in topoJson
  console.log(wahlbez);
 
  this.bringToFront();
  this.setStyle({
    fillColor: '#4fa3f2',
    color: '#13599b ',
    weight:2,
    opacity: 1
  });
}
 
function leaveLayer(){  
  this.bringToBack();
  this.setStyle({
    fillColor : '#fff',
    color:'#999',
    weight:1,
    opacity:.5
  });
}