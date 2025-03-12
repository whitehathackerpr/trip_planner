import React, { useEffect } from "react";

const RouteMap = ({ routeData }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // ID
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: routeData.startCoordinates,
      zoom: 10,
    });

    // Add route
    if (routeData.routeCoordinates) {
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: routeData.routeCoordinates,
        },
      };

      map.addSource("route", {
        type: "geojson",
        data: geojson,
      });

      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 6,
        },
      });
    }
  }, [routeData]);

  return <div id="map" className="w-full h-64"></div>;
};

export default RouteMap;
