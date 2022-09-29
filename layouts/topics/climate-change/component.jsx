import Cover from "components/cover";
import LocationProvider from "providers/location-provider";
import LocationSelector from "../components/location-selector";

import { Row, Column, Desktop, Mobile } from "hw-components";
import Widgets from "./widgets";

import bgImage from "../assets/africa-temperature.png";

import "./styles.scss";

const LayoutClimateChange = ({}) => {
  return (
    <div className="l-climatechange-page">
      <LocationProvider />
      <Cover
        title="Climate Change"
        description="The Paris Agreement of 2015 sets out a global framework to limit global warming to well below 2°C, preferably to 1.5°C (degrees Celsius), compared to pre-industrial levels. To achieve this global temperature goal, countries aim to reduce growth of greenhouse gas emissions as soon as possible and rapid reductions thereafter, based on the best available science, economic and social feasibility."
        bgImage={bgImage}
        // webP={bgImageWebP}
      ></Cover>
      <div>
        <Row>
          <Column>
            <LocationSelector />
          </Column>
        </Row>
      </div>
      <Widgets />
    </div>
  );
};

export default LayoutClimateChange;
