import request from "utils/request";

import { getDatesOptions, CQL_AFRICA_FILTER } from "./utils";
import { ASAP_AFRICA_COUNTRIES } from "./data";

const category = "agriculture";
const subCategory = "asap-agric-warnings";

const datasetName = "Crops Conditions";
const layerId = "crop_conditions";
const layerName = "asap5:view_Crop_500k";

const datasets = [
  {
    name: datasetName,
    id: layerId,
    dataset: layerId,
    type: "dataset",
    published: true,
    active: true,
    status: "saved",
    layer: layerId,
    category: category,
    sub_category: subCategory,
    metadata: "",
    citation: "ASAP, Updated every 10days",
    layers: [
      {
        id: layerId,
        dataset: layerId,
        name: datasetName,
        layerConfig: {
          source: {
            maxzoom: 12,
            minzoom: 3,
            tiles: [
              `https://agriculturehotspots.icpac.net/asap/wms?viewparams=reference_date:{time}&LAYERS=${layerName}&FORMAT=image/png&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&STYLES=&TILED=true&CRS=EPSG:3857&gridSet=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=512&HEIGHT=512&FORMAT_OPTIONS=dpi:60&cql_filter={cql_filter}`,
            ],

            type: "raster",
          },
          type: "raster",
        },
        legendConfig: {
          items: [
            {
              color: "#CDDFC8",
              name: "No Warning",
            },
            {
              color: "#ECECEC",
              name: "Not Active",
            },
            {
              color: "#FFFD75",
              name: "Water Balance Warning",
            },
            {
              color: "#F8CD46",
              name: "Biomass Warning",
            },
            {
              color: "#BF271B",
              name: "Water Balance + Biomass Warning",
            },
            {
              color: "#81170E",
              name: "End of Season Biomass Warning",
            },
            {
              color: "#FFFFFF",
              name: "Not Analyzed",
            },
          ],
          type: "basic",
        },
        params: {
          time: "",
          cql_filter: CQL_AFRICA_FILTER,
        },
        paramsSelectorColumnView: true,
        paramsSelectorConfig: [
          {
            key: "time",
            required: true,
            sentence: "Date {selector}",
            type: "select",
            options: [],
            optionsFromTimeStamps: true,
          },
          {
            key: "cql_filter",
            required: true,
            hidden: true,
            options: [],
          },
        ],
      },
    ],
  },
];

const updates = [
  {
    layer: layerId,
    getTimestamps: (params = {}, token) => {
      return request
        .get("https://www.icpac.net/api/asaprefdate?format=json", {
          timeout: 6000,
        })
        .then((res) => {
          const data = res.data;

          const refDate = data?.refdate;

          const dateOptions = getDatesOptions(refDate);

          return dateOptions;
        });
    },
    getCurrentLayerTime: (dateOptions) => {
      const option = dateOptions[0];

      return option && option.value;
    },
    paramClipByMapLocationContext: (countryIso) => {
      if (!countryIso || countryIso === "africa") {
        return { param: "cql_filter", value: CQL_AFRICA_FILTER };
      }

      const option = ASAP_AFRICA_COUNTRIES.find(
        (c) => c.isocode3 === countryIso
      );

      return (
        option && {
          param: "cql_filter",
          value: `adm0_code = ${option.adm0_code}`,
        }
      );
    },
    paramClipByGeostore: (geostore) => {
      const { info } = geostore || {};

      if (info && info.iso) {
        const option = ASAP_AFRICA_COUNTRIES.find(
          (c) => c.isocode3 === info.iso
        );

        return (
          option && {
            param: "cql_filter",
            value: `adm0_code = ${option.adm0_code}`,
          }
        );
      } else {
        return { param: "cql_filter", value: CQL_AFRICA_FILTER };
      }
    },
  },
];

export default { datasets, updates };
