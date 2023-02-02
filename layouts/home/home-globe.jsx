import React, { Component } from "react";
import ahwGlobeBg from "./assets/earth-blue-marble-min.jpg";

let Globe = () => null;
if (typeof window !== "undefined") Globe = require("react-globe.gl").default;

export default class HomeGlobe extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.globeRef = React.createRef();
  }

  componentDidMount() {
    // fetch("../datasets/ne_110m_admin_0_countries.geojson")
    //   .then((res) => res.json())
    //   .then(setCountries);
  }

  onGlobeReady = () => {
    this.globeRef.current.controls().enableZoom = false;
    this.globeRef.current.controls().autoRotate = true;
    this.globeRef.current.controls().autoRotateSpeed = 1;
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
        />
      </div>
    );
  }
}
