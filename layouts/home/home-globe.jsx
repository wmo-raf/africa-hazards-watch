import React, { Component } from "react";
import ahwGlobeBg from "./assets/earth-blue-marble-min.jpg";
import africaCountries from "./assets/countries.json";

let Globe = () => null;
if (typeof window !== "undefined") Globe = require("react-globe.gl").default;

export default class HomeGlobe extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.globeRef = React.createRef();

    this.state = {
      countries: null,
    };
  }

  onGlobeReady = () => {
    this.globeRef.current.scene().position.y = 20;

    this.globeRef.current.controls().enableZoom = false;
    this.globeRef.current.controls().autoRotate = true;
    this.globeRef.current.controls().autoRotateSpeed = 0.4;
  };

  render() {
    return (
      <div>
        <Globe
          onGlobeReady={this.onGlobeReady}
          ref={this.globeRef}
          height={450}
          width={400}
          backgroundColor="#fff"
          globeImageUrl={ahwGlobeBg}
          atmosphereAltitude={0}
          polygonsData={africaCountries.features}
          polygonCapColor={() => "rgba(255, 255, 255, 0)"}
          polygonSideColor={() => "rgba(164, 219, 253, 0.5)"}
          polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
      `}
        />
      </div>
    );
  }
}
