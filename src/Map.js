import React, { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from "react-map-gl";
import * as Data from "./geoJSON.json";
import Pin from "./Pin";
import { mapStyle } from "./Path";

const coord = {
  coordinates: [
    [-122.48369693756104, 37.83381888486939],
    [-122.48348236083984, 37.83317489144141],
    [-122.48339653015138, 37.83270036637107],
    [-122.48356819152832, 37.832056363179625],
    [-122.48404026031496, 37.83114119107971],
    [-122.48404026031496, 37.83049717427869],
    [-122.48348236083984, 37.829920943955045],
    [-122.48356819152832, 37.82954808664175],
    [-122.48507022857666, 37.82944639795659],
    [-122.48610019683838, 37.82880236636284],
    [-122.48695850372314, 37.82931081282506],
    [-122.48700141906738, 37.83080223556934],
    [-122.48751640319824, 37.83168351665737],
    [-122.48803138732912, 37.832158048267786],
    [-122.48888969421387, 37.83297152392784],
    [-122.48987674713133, 37.83263257682617],
    [-122.49043464660643, 37.832937629287755],
    [-122.49125003814696, 37.832429207817725],
    [-122.49163627624512, 37.832564787218985],
    [-122.49223709106445, 37.83337825839438],
    [-122.49378204345702, 37.83368330777276]
  ]
};

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 37.83168351665737,
    longitude: -122.48751640319824,
    zoom: 10
  });

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    //   removeListener on unmount
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div style={{ width: "600px", height: "300px", position: "relative" }}>
      <ReactMapGL
        {...viewport}
        // attributionControl={false}
        width="100%"
        height="100%"
        mapboxApiAccessToken="pk.eyJ1Ijoic2hpaGFiLWJvdW5jZSIsImEiOiJjazBnZmd0ejcwNmo3M21uNThtZDZ1OHg0In0.OxVUUTDvjttkrfuU8WQPMg"
        onViewportChange={viewport => setViewport(viewport)}
        //   mapStyle="mapbox://styles/shihab-bounce/cjxvmqu4a6hzu1cocdsdfw9ln"
        mapStyle={"mapbox://styles/shihab-bounce/cjxvmqu4a6hzu1cocdsdfw9ln"}
      >
        {/* {Data.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          longitude={park.geometry.coordinates[0]}
          latitude={park.geometry.coordinates[1]}
        >
          <Pin
            size={20}
            onClick={e => {
              e.preventDefault();
              setSelectedPark(park);
            }}
          />
        </Marker>
      ))} */}
        {coord.coordinates.map((i, index) => (
          <Marker key={index} longitude={i[0]} latitude={i[1]}>
            <Pin size={10} />
          </Marker>
        ))}
        {selectedPark && (
          <React.Fragment>
            <Popup
              tipSize={5}
              anchor="top"
              longitude={selectedPark.geometry.coordinates[0]}
              latitude={selectedPark.geometry.coordinates[1]}
              onClose={() => setSelectedPark(null)}
            >
              <div style={{ width: "200px", height: "auto" }}>
                <h5>{selectedPark.properties.NAME}</h5>
                <p>{selectedPark.properties.DESCRIPTIO}</p>
              </div>
            </Popup>
          </React.Fragment>
        )}
        <div style={{ position: "absolute", bottom: 50, right: 10 }}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </div>
  );
}
