import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = ({ currentLocation, dropoffLocation }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: currentLocation || [0, 0], // Default center
      zoom: 10,
    });

    if (currentLocation) {
      new mapboxgl.Marker().setLngLat(currentLocation).addTo(map.current);
    }

    if (dropoffLocation) {
      new mapboxgl.Marker({ color: "red" })
        .setLngLat(dropoffLocation)
        .addTo(map.current);

      // Add a line between current and dropoff locations
      const lineCoordinates = [currentLocation, dropoffLocation];
      map.current.on("load", () => {
        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: lineCoordinates,
            },
          },
        });
        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#1db7dd",
            "line-width": 4,
          },
        });
      });
    }
  }, [currentLocation, dropoffLocation]);

  return (
    <div>
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "400px" }}
        className="rounded shadow-lg"
      />
    </div>
  );
};

export default Map;
