import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaMapMarkerAlt, FaTruck, FaFlag } from "react-icons/fa";
import MapLegend from "./MapLegend";

// Replace with your Mapbox access token
mapboxgl.accessToken = "pk.your_mapbox_token_here";

const Map = ({ currentLocation, pickupLocation, dropoffLocation, routeGeometry }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-95.7129, 37.0902], // Center of US
      zoom: 3,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl());

    // Clean up on unmount
    return () => map.current.remove();
  }, []);

  // Add markers and route when locations and route geometry are available
  useEffect(() => {
    if (!map.current || !currentLocation || !pickupLocation || !dropoffLocation) return;

    // Function to geocode an address and return coordinates
    const geocodeAddress = async (address) => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
          )}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        return data.features[0].center;
      } catch (error) {
        console.error("Error geocoding address:", error);
        return null;
      }
    };

    // Add markers and fit bounds
    const addMarkersAndFitBounds = async () => {
      // Remove existing markers
      const markers = document.querySelectorAll(".mapboxgl-marker");
      markers.forEach((marker) => marker.remove());

      // Geocode addresses
      const currentCoords = await geocodeAddress(currentLocation);
      const pickupCoords = await geocodeAddress(pickupLocation);
      const dropoffCoords = await geocodeAddress(dropoffLocation);

      if (!currentCoords || !pickupCoords || !dropoffCoords) return;

      // Create custom marker elements
      const createMarkerElement = (icon, color, title) => {
        const el = document.createElement("div");
        el.className = "flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg";
        el.innerHTML = `<div class="text-${color}-600" title="${title}">${icon}</div>`;
        return el;
      };

      // Add markers
      new mapboxgl.Marker(createMarkerElement('<i class="fa fa-map-marker-alt"></i>', "blue", "Current Location"))
        .setLngLat(currentCoords)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>Current Location</h3><p>${currentLocation}</p>`))
        .addTo(map.current);

      new mapboxgl.Marker(createMarkerElement('<i class="fa fa-truck"></i>', "green", "Pickup Location"))
        .setLngLat(pickupCoords)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>Pickup Location</h3><p>${pickupLocation}</p>`))
        .addTo(map.current);

      new mapboxgl.Marker(createMarkerElement('<i class="fa fa-flag"></i>', "red", "Dropoff Location"))
        .setLngLat(dropoffCoords)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>Dropoff Location</h3><p>${dropoffLocation}</p>`))
        .addTo(map.current);

      // Fit bounds to include all markers
      const bounds = new mapboxgl.LngLatBounds()
        .extend(currentCoords)
        .extend(pickupCoords)
        .extend(dropoffCoords);

      map.current.fitBounds(bounds, {
        padding: 100,
        maxZoom: 12,
        duration: 1000,
      });

      // Add route if geometry is available
      if (routeGeometry) {
        if (map.current.getSource("route")) {
          map.current.removeLayer("route");
          map.current.removeSource("route");
        }

        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: routeGeometry,
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
            "line-color": "#4287f5",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
    };

    addMarkersAndFitBounds();
  }, [currentLocation, pickupLocation, dropoffLocation, routeGeometry]);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <div ref={mapContainer} className="h-96 w-full" />
      <MapLegend />
    </div>
  );
};

export default Map;
