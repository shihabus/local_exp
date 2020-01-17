import React, { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import ReactMapGL, {
  StaticMap,
  NavigationControl,
  InteractiveMap
} from "react-map-gl";
import hexToRgba from "hex-to-rgba";
import { scaleThreshold } from "d3-scale";
import Color from "color";
import { data } from "./Data/Geojson.js";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoic2hpaGFiLWJvdW5jZSIsImEiOiJjanh2bWh1MzkwNjJhM21wODdyeGw0dDF0In0.hyqR_WG8R6qZcogwgljjyQ";

const App = () => {
  //   const {data, viewport} = this.props;

  //   Point
  //   MultiLineString
  //   Polygon

  useEffect(() => {
    console.log('Online',navigator.onLine);
  }, [])

  const [geoData, setGeoData] = useState(data);

  const onClick = prop => {
    let temp = data.features.filter(x => x.geometry.type === prop);
    let geo = { type: "FeatureCollection", features: temp };
    setGeoData(geo);
  };

  const initialViewState = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0
  };

  const [viewport, setViewport] = useState({
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0
  });

  /**
   * Data format:
   * Valid GeoJSON object
   */
  const layer = new GeoJsonLayer({
    id: "geojson-layer",
    data: geoData,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 200],
    getLineColor: d =>
      Color(d.properties.color)
        .round()
        .array(),
    getRadius: 100,
    getLineWidth: 1,
    getElevation: 30
    // onHover: ({object, x, y}) => {
    //   const tooltip = object.properties.name || object.properties.station;
    //   /* Update tooltip
    //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
    //   */
    // }
  });

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <InteractiveMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={viewport => setViewport(viewport)}
      >
        <div
          style={{
            position: "absolute",
            cursor: "pointer",
            bottom: 30,
            right: 30,
            zIndex: 100,
          }}
          className="Nav"
        >
          <NavigationControl />
        </div>

        <DeckGL
            viewState={viewport}
        //   initialViewState={initialViewState}
          layers={[layer]}
        //   controller={true}
        >
          {/* <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} /> */}
        </DeckGL>
        <div
          style={{
            position: "absolute",
            cursor: "pointer",
            padding: 10,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <button onClick={() => onClick("Point")}>Point</button>
          <button onClick={() => onClick("MultiLineString")}>
            MultiLineString
          </button>
          <button onClick={() => onClick("Polygon")}>Polygon</button>
        </div>
      </InteractiveMap>
    </div>
  );
};

export default App;
