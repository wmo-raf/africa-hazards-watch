import Cover from "components/cover";
import LocationProvider from "providers/location-provider";
import LocationSelector from "../components/location-selector";

import { Row, Column, Desktop, Mobile } from "hw-components";
import Widgets from "./widgets";

import bgImage from "../assets/africa-temperature.png";

import "./styles.scss";

const LayoutClimateChange = ({ location }) => {
  const { type, adm0, adm1 } = location;

  const canShowWidget =
    type === "point" && !isNaN(Number(adm0)) && !isNaN(Number(adm1));

  return (
    <div className="l-climatechange-page">
      <LocationProvider />
      <Cover
        title="Climate Change"
        description="The Paris Agreement of 2015 sets out a global framework to limit global warming to well below 2°C, preferably to 1.5°C (degrees Celsius), compared to pre-industrial levels. To achieve this global temperature goal, countries aim to reduce growth of greenhouse gas emissions as soon as possible and rapid reductions thereafter, based on the best available science, economic and social feasibility. "
        bgImage={bgImage}
        // webP={bgImageWebP}
      ></Cover>
      <div>
        <Row>
          <Column>
            <div className="topic-header">
              The data source used in the analysis is ERA5, the fifth generation
              ECMWF atmospheric reanalysis of the global climate, covering the
              time range from 1959 to 2021, with a spatial resolution of 30 km.
              The data will not show conditions at an exact location.
              Micro-climates and local differences will not appear. Therefore,
              temperatures will be often higher than those displayed especially
              in cities and precipitation may vary locally, depending on
              topography.
            </div>
          </Column>
        </Row>
      </div>
      <div>
        <Row>
          <Column>
            <LocationSelector />
          </Column>
        </Row>
      </div>
      {canShowWidget && <Widgets />}
    </div>
  );

  return null;
};

export default LayoutClimateChange;
