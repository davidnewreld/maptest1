var map = L.map('map').setView([53.5510846, 9.99368179999999], 13);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
}).addTo(map);


var test = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "stroke": "#555555",
        "stroke-width": 2,
        "stroke-opacity": 1,
        "fill": "#555555",
        "fill-opacity": 0.5
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              10.00255823135376,
              53.55559352906138
            ],
            [
              10.007193088531494,
              53.55319706845856
            ],
            [
              9.998974800109863,
              53.55118291681195
            ],
            [
              9.995133876800537,
              53.55457377518183
            ],
            [
              10.00255823135376,
              53.55559352906138
            ]
          ]
        ]
      }
    }
  ]
}

L.geoJson(hastadtteile).addTo(map);