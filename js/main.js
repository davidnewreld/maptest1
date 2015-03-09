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

// helper functions

function round(number, n) {
  var factor;
  factor = Math.pow(10, n);
  return (Math.round(number * factor) / factor);
}

// create map

var map = L.map('map', {zoomControl : false}).setView([53.5510846, 9.99368179999999], 11);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  maxZoom: 18,
  minZoom: 11
}).addTo(map);

map.addControl( L.control.zoom({position: 'bottomleft'}) );

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
topoLayer.setStyle(style);

function handleLayer(layer) {
  /*  layer.setStyle({
      fillColor: '#fff',
      fillOpacity: 0.5,
      color: '#999',
      weight: 1,
      opacity: 0.5
    });*/

  layer.on({
    mouseover: enterLayer,
    mouseout: leaveLayer
  });
}

var currentMousePos = {
  x: -1,
  y: -1
};
$('#map').mousemove(function (event) {
  currentMousePos.x = event.pageX;
  currentMousePos.y = event.pageY;
  $info.css({
    "top": currentMousePos.y + 25,
    "left": currentMousePos.x + 25
  });
});

function getColor(d) {
  return  d < 2.5 ? 'rgb(8,29,88)' :
          d < 5 ? 'rgb(37,52,148)' :
          d < 7.5 ? 'rgb(34,94,168)' :
          d < 10 ? 'rgb(29,145,192)' :
          d < 12.5 ? 'rgb(65,182,196)' :
          d < 15 ? 'rgb(127,205,187)' :
          d < 17.5 ? 'rgb(199,233,180)' :
          d < 20 ? 'rgb(237,248,177)' :
        'rgb(255,255,217)';
}


function style(feature) {
  return {
    fillColor: getColor(feature.properties.FDP),
    weight: 1,
    opacity: .3,
    color: '#333',
    fillOpacity: 0.5
  };

}


function enterLayer() {
  $wahlbez.text(this.feature.properties.WAHLBEZ);
  $wahlbet.text(this.feature.properties.WAHLBET);
  $SPD.text(this.feature.properties.SPD);
  $CDU.text(this.feature.properties.CDU);
  $LINKE.text(this.feature.properties.LINKE);
  $FDP.text(this.feature.properties.FDP);
  $GRUENE.text(this.feature.properties.GRUENE);
  $AFD.text(this.feature.properties.AFD);
  $PIRATEN.text(this.feature.properties.PIRATEN);
  $NPD.text(this.feature.properties.NPD);
  $PARTEI.text(this.feature.properties.PARTEI);
  $OEDP.text(this.feature.properties.OEDP);
  $RENTNER.text(this.feature.properties.RENTNER);
  $HHBL.text(this.feature.properties.HHBL);
  $LIBERALE.text(this.feature.properties.LIBERALE);

  $info.show();

  this.bringToFront();
  this.setStyle({
    color: '#fff ',
    weight: 2,
    opacity: 1
  });
}

function leaveLayer() {
  $info.hide();
  this.bringToBack();
  this.setStyle({
    color: '#333',
    weight: 1,
    opacity: .3
  });
}