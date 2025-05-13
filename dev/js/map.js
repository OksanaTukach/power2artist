const PointCollection = {
    "type": "FeatureCollection",
    "features": [
        {"type": "Feature", "id": 0, "geometry":
        	{"type": "Point", "coordinates":
        		[55.831903, 37.411961]},
    		"properties":
    			{"balloonContentHeader":
    				"<div>Header</div>",
				"balloonContentBody":
					"Body",
				"balloonContentFooter":
					"Footer",
				"hintContent":
					"Хинт балуна"
				}
		},
        {"type": "Feature", "id": 1, "geometry":
        	{"type": "Point", "coordinates":
        		[55.831903, 38.411961]},
    		"properties":
    			{"balloonContentHeader":
    				"<div>Header</div>",
				"balloonContentBody":
					"Body",
				"balloonContentFooter":
					"Footer",
				"hintContent":
					"Хинт балуна"
				}
		},
        {"type": "Feature", "id": 2, "geometry":
        	{"type": "Point", "coordinates":
        		[56.831903, 38.411961]},
    		"properties":
    			{"balloonContentHeader":
    				"<div>Header</div>",
				"balloonContentBody":
					"Body",
				"balloonContentFooter":
					"Footer",
				"hintContent":
					"Хинт балуна"
				}
		},
    ]
}

ymaps.ready(init);
function init(){ 
	var myMap = new ymaps.Map("map", {
		center: [55.76, 37.64],
		zoom: 7
	}),
	objectManager = new ymaps.ObjectManager({
		clusterize: true,
	});

	myMap.geoObjects.add(objectManager);

	objectManager.add(PointCollection);
}