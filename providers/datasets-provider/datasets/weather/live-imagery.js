import { getLatestDates } from "services/live-imagery";

const category = 1;
const subCategory = 2;

export default [
  {
    id: "msg_fes:rgb_naturalenhncd",
    dataset: "msg_fes:rgb_naturalenhncd",
    name: "Natural Colour Enhanced RGB",
    layer: "msg_fes:rgb_naturalenhncd",
    category: category,
    sub_category: subCategory,
    metadata: "f4530e0b-6981-48b8-9121-163669099ee4",
    isNearRealTime: true,
    initialVisible: true,
    citation: "EUMETSAT, Updated every 15 minutes",
    layers: [
      {
        name: "Natural Colour Enhanced RGB",
        id: "msg_fes:rgb_naturalenhncd",
        type: "layer",
        default: true,
        dataset: "msg_fes:rgb_naturalenhncd",
        layerConfig: {
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              "https://eahazardswatch.icpac.net/live-imagery/api/v1/metsat/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png8&TRANSPARENT=true&LAYERS=msg_fes:rgb_naturalenhncd&time={time}&STYLES=&tiled=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}",
            ],
            minzoom: 3,
            maxzoom: 12,
          },
        },
        params: {
          time: "",
        },
        paramsSelectorConfig: [
          {
            key: "time",
            required: true,
            sentence: "{selector}",
            type: "datetime",
            dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
            availableDates: [],
          },
        ],
        legendConfig: {},
      },
    ],
  },
  {
    id: "msg_iodc:mpe",
    dataset: "msg_iodc:mpe",
    name: "Multi-Sensor Precipitation Estimate",
    layer: "msg_iodc:mpe",
    category: category,
    sub_category: subCategory,
    metadata: "be96986f-f751-4530-a62a-d29aac0c39d9",
    isNearRealTime: true,
    citation: "EUMETSAT, Updated every 15 minutes",
    layers: [
      {
        name: "Multi-Sensor Precipitation Estimate",
        id: "msg_iodc:mpe",
        type: "layer",
        default: true,
        dataset: "msg_iodc:mpe",
        layerConfig: {
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              "https://eahazardswatch.icpac.net/live-imagery/api/v1/metsat/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png8&TRANSPARENT=true&LAYERS=msg_iodc:mpe&time={time}&STYLES=&tiled=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}",
            ],
            minzoom: 3,
            maxzoom: 12,
          },
        },
        params: {
          time: "",
        },
        paramsSelectorConfig: [
          {
            key: "time",
            required: true,
            sentence: "{selector}",
            type: "datetime",
            dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
            availableDates: [],
          },
        ],
        legendConfig: {},
        legendImage: {
          url:
            "https://www.icpac.net/images/KYNTgK-_n6tyGGOZGkrQ69yLGkM=/1518/original/",
        },
      },
    ],
  },
];
