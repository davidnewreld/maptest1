// Add Leaflet TopoJson Support
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

// create map

var map = L.map('map').setView([53.5510846, 9.99368179999999], 12);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  maxZoom: 18, minZoom: 11
}).addTo(map);

/* schönere mapbox version */
/*L.tileLayer('http://api.tiles.mapbox.com/v4/golian.ifca0pb9/{z}/{x}/{y}.png32?access_token=pk.eyJ1IjoiZ29saWFuIiwiYSI6IjB4aWtrWUkifQ.Gkl77qEV8DM5feblzjj67g', {
  attribution: '<a href="https://www.mapbox.com/about/maps/">© Mapbox © OpenStreetMap</a> <a href="https://www.mapbox.com/map-feedback/">Improve this map</a>',
  maxZoom: 18
}).addTo(map);*/

var $info = $('#infolayer');

var $wahlbez = $('#wahlbez span');
var $wahlbet = $('#wahlbet span');
var $SPD = $('.SPD span');
var $CDU = $('.CDU span');
var $LINKE = $('.LINKE span');
var $FDP = $('.FDP span');
var $GRUENE = $('.GRUENE span');
var $AFD = $('.AFD span');
var $PIRATEN = $('.PIRATEN span');
var $NPD = $('.NPD span');
var $PARTEI = $('.PARTEI span');
var $OEDP = $('.OEDP span');
var $RENTNER = $('.RENTNER span');
var $HHBL = $('.HHBL span');
var $LIBERALE = $('.LIBERALE span');

var topoLayer = new L.TopoJSON();
topoLayer.addData(wahldata);
topoLayer.addTo(map);
topoLayer.eachLayer(handleLayer);

function round(number,n){
    var factor;
    factor = Math.pow(10,n);
    return(Math.round(number * factor) / factor);
}
function handleLayer(layer) {
  layer.setStyle({
    fillColor: '#fff',
    fillOpacity: 0.5,
    color: '#999',
    weight: 1,
    opacity: 0.5
  });

  layer.on({
    mouseover: enterLayer,
    mouseout: leaveLayer
  });
}

function enterLayer() {
  $wahlbez.text(this.feature.id)
  $wahlbet.text(round((this.feature.properties.WAEHLER)/(this.feature.properties.WAHLBER/100),1) + " %");
  $SPD.text(round((this.feature.properties.SPD)/(this.feature.properties.STIMMEN/100),1) + " %");
  $CDU.text(round((this.feature.properties.CDU)/(this.feature.properties.STIMMEN/100),1) + " %");
  $LINKE.text(round((this.feature.properties.LINKE)/(this.feature.properties.STIMMEN/100),1) + " %");
  $FDP.text(round((this.feature.properties.FDP)/(this.feature.properties.STIMMEN/100),1) + " %");
  $GRUENE.text(round((this.feature.properties.GRUENE)/(this.feature.properties.STIMMEN/100),1) + " %");
  $AFD.text(round((this.feature.properties.AFD)/(this.feature.properties.STIMMEN/100),1) + " %");
  $PIRATEN.text(round((this.feature.properties.PIRATEN)/(this.feature.properties.STIMMEN/100),1) + " %");
  $NPD.text(round((this.feature.properties.NPD)/(this.feature.properties.STIMMEN/100),1) + " %");
  $PARTEI.text(round((this.feature.properties.PARTEI)/(this.feature.properties.STIMMEN/100),1) + " %");
  $OEDP.text(round((this.feature.properties.OEDP)/(this.feature.properties.STIMMEN/100),1) + " %");
  $RENTNER.text(round((this.feature.properties.RENTNER)/(this.feature.properties.STIMMEN/100),1) + " %");
  $HHBL.text(round((this.feature.properties.HHBL)/(this.feature.properties.STIMMEN/100),1) + " %");
  $LIBERALE.text(round((this.feature.properties.LIBERALE)/(this.feature.properties.STIMMEN/100),1) + " %");
  
  $info.show();

  this.bringToFront();
  this.setStyle({
    fillColor: '#000',
    color: '#000 ',
    weight: 2,
    opacity: 1
  });
}

function leaveLayer() {
  $info.hide();
  this.bringToBack();
  this.setStyle({
    fillColor: '#fff',
    color: '#999',
    weight: 1,
    opacity: .5
  });
}